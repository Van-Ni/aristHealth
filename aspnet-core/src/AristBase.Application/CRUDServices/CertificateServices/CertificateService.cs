using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.Runtime.Session;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.Extensions;
using AristBase.Extensions.Storage;
using AristBase.Interfaces;
using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace AristBase.CRUDServices.CertificateServices
{
    public class CertificateCsvDto
    {
        public int STT { get; set; }
        public int MaKhachHang { get; set; }
        public string TenNguoiMua { get; set; }
        public string DiaChiKhachHang { get; set; }
        public string HinhThucTT { get; set; }
        public string SanPham { get; set; }
        public string DonViTinh { get; set; }
        public decimal TienBan { get; set; }
        public string ThueSuat { get; set; }
        public decimal TongCong { get; set; }
        public string DonViTienTe { get; set; }
        public string Reason { get; set; }
    }
    public class CertificateService : AsyncCrudAppService<Certificate, CertificateDto, Guid, PagedAndSortedAndSearchAndDateResultDto, CreateCertificateDto, UpdateCertificateDto>
    {
        private readonly IRepository<CertificateType, int> _cerTypeRepo;
        private readonly IRepository<CertificateGroupStatus, Guid> _cerGroupStatus;
        private readonly IRepository<HistoryExport, Guid> _historyRepo;
        private readonly IStorageService storageService;



        public CertificateService(
            IRepository<Certificate, Guid> repository,
            IRepository<CertificateType, int> cerTypeRepo
,
            IRepository<CertificateGroupStatus, Guid> cerGroupStatus
,
            IRepository<HistoryExport, Guid> historyRepo,
            IStorageService storageService) : base(repository)
        {
            _cerTypeRepo = cerTypeRepo;
            _cerGroupStatus = cerGroupStatus;
            _historyRepo = historyRepo;
            this.storageService = storageService;
        }
        public async override Task<PagedResultDto<CertificateDto>> GetAllAsync(PagedAndSortedAndSearchAndDateResultDto input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            if (input.DateFrom != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime >= input.DateFrom);
            }
            if (input.DateTo != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime <= input.DateTo);
            }
            query = query.Include(i => i.ClientInfo).Include(i => i.CertificateType).Include(i => i.CertificateType).WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.ClientInfo.FullName.Contains(input.Keyword)
                || x.CertificateType.Name.Contains(input.Keyword)
                || x.ClientInfo.CCCD.Contains(input.Keyword)
                );

            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            //query = ApplySorting(query, input);
            query = query
                .OrderBy(c=>c.Status).ThenByDescending(Q => Q.ClientInfo.Id);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }

        public async override Task<CertificateDto> CreateAsync(CreateCertificateDto input)
        {
            CheckCreatePermission();
            try
            {
                var cerType = await _cerTypeRepo.GetAll().Where(w => w.Id == input.CertificateTypeId).FirstOrDefaultAsync();
                DateTime parsedDate1;
                DateTime parsedDate2;


                if (DateTime.TryParse(input.ClientInfo.DateOfBirth, out parsedDate1))
                {
                    input.ClientInfo.DateOfBirth = parsedDate1.ToString("dd/MM/yyyy");
                }
                if (DateTime.TryParse(input.ClientInfo.CreateTimeCCCD, out parsedDate2))
                {
                    input.ClientInfo.CreateTimeCCCD = parsedDate2.ToString("dd/MM/yyyy");
                }

                var entity = MapToEntity(input);
                if (entity.PaymentStatus == PaymentStatus.Paid)
                {
                    entity.AmountPaid = cerType.Price;
                }
                //Insert into table CertificateGroupStatus with status = unready|optional
                await Repository.InsertAsync(entity);
                var templateGroups = cerType.TemplateGroups.Select(tg => new CertificateGroupStatus
                {
                    CertificateId = entity.Id,
                    Group = tg.GroupName,
                    Status = tg.DefaultStatus,
                    Content = tg.DefaultContent
                });
                await _cerGroupStatus.InsertRangeAsync(templateGroups);
                await CurrentUnitOfWork.SaveChangesAsync();
                return MapToEntityDto(entity);
            }
            catch (Exception ex) { throw new Exception(); }
        }
        public async override Task<CertificateDto> UpdateAsync(UpdateCertificateDto input)
        {
            DateTime parsedDate1;
            DateTime parsedDate2;

            if (DateTime.TryParse(input.ClientInfo.DateOfBirth, out parsedDate1))
            {
                input.ClientInfo.DateOfBirth = parsedDate1.ToString("dd/MM/yyyy");
            }
            if (DateTime.TryParse(input.ClientInfo.CreateTimeCCCD, out parsedDate2))
            {
                input.ClientInfo.CreateTimeCCCD = parsedDate2.ToString("dd/MM/yyyy");
            }
            var entity = await GetEntityByIdAsync(input.Id);
            MapToEntity(input, entity);
            var cerType = await _cerTypeRepo.GetAll().Where(w => w.Id == input.CertificateTypeId).FirstOrDefaultAsync();

            if (entity.PaymentStatus == PaymentStatus.Paid)
            {
                entity.AmountPaid = cerType.Price;
            }
            entity.ClientInfo.TenantId = AbpSession.TenantId.Value;
            entity.TenantId = AbpSession.TenantId.Value;
            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
            //return base.UpdateAsync(input);
        }
        public async Task<CertificateDto> GetProfile(Guid id)
        {
            CheckGetPermission();
            var get = await Repository.GetAll().Where(i => i.Id == id).Include(i => i.ClientInfo).FirstOrDefaultAsync();
            return MapToEntityDto(get);
        }

    }
}
