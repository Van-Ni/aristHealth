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

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public async ValueTask<IEnumerable<CertificateDto>> GetCertificateByDate(DateTime DateFrom, DateTime DateTo, Status status)
        {
            var query = Repository.GetAll();
            if (DateFrom != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime >= DateFrom);
            }
            if (DateTo != DateTime.MinValue)
            {
                query = query.Where(w => w.CreationTime <= DateTo);
            }
            if (status != null)
            {
                query = query.Where(w => w.Status == status);
            }
            query = query.Include(i => i.ClientInfo).Include(i => i.CertificateType);
            var entities = await AsyncQueryableExecuter.ToListAsync(query);
            return ObjectMapper.Map<IEnumerable<CertificateDto>>(entities);
        }
        public async Task<FileContentResult> GetExportCertificateList(DateTime DateFrom, DateTime DateTo, Status status)
        {
            try
            {
                string reportname = $"Danhsach_{Guid.NewGuid():N}.xlsx";
                var list = await GetCertificateByDate(DateFrom, DateTo, status);

                var certificate = list.Select((e, index) => new CertificateCsvDto
                {
                    STT = index + 1,
                    MaKhachHang = e.ClientInfo.Id,
                    TenNguoiMua = e.ClientInfo.FullName,
                    DiaChiKhachHang = e.ClientInfo.Address,
                    HinhThucTT = "TM",
                    SanPham = e.CertificateType.Name,
                    DonViTinh = "Nguoi",
                    TienBan = e.AmountPaid,
                    ThueSuat = "-1.00",
                    TongCong = e.AmountPaid,
                    DonViTienTe = "VND"
                }).ToList();
                var exportbytes = ExportExcelCSV.ExporttoExcel<CertificateCsvDto>(certificate, reportname);

                var data = await storageService.SaveFileExcelAsync(reportname, "Excel", stream: new MemoryStream(exportbytes));
                var obj = new HistoryExport()
                {
                    filePath = data,
                    End = DateTo,
                    Start = DateFrom,
                    Status = Status.Finish,
                    Type = "Báo cáo doanh thu",
                    UserId = AbpSession.UserId,

                };
                await _historyRepo.InsertAsync(obj);
                await CurrentUnitOfWork.SaveChangesAsync();
                return new FileContentResult(exportbytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                {
                    FileDownloadName = reportname
                };
            }
            catch (Exception ex) { throw; }
        }
        public async override Task<CertificateDto> CreateAsync(CreateCertificateDto input)
        {
            CheckCreatePermission();
            try
            {
                var cerType = await _cerTypeRepo.GetAll().Where(w => w.Id == input.CertificateTypeId).FirstOrDefaultAsync();
                DateTime parsedDate1;
                DateTime parsedDate2;

                if (DateTime.TryParseExact(input.ClientInfo.DateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate1))
                {

                    DateTime date = DateTime.ParseExact(input.ClientInfo.DateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture);
                    input.ClientInfo.DateOfBirth = date.ToString("dd/MM/yyyy");
                }
                if (DateTime.TryParseExact(input.ClientInfo.CreateTimeCCCD, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate2))
                {
                    DateTime date1 = DateTime.ParseExact(input.ClientInfo.CreateTimeCCCD, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture);
                    input.ClientInfo.CreateTimeCCCD = date1.ToString("dd/MM/yyyy");
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

            if (DateTime.TryParseExact(input.ClientInfo.DateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate1))
            {

                DateTime date = DateTime.ParseExact(input.ClientInfo.DateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture);
                input.ClientInfo.DateOfBirth = date.ToString("dd/MM/yyyy");
            }
            if (DateTime.TryParseExact(input.ClientInfo.CreateTimeCCCD, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate2))
            {
                DateTime date1 = DateTime.ParseExact(input.ClientInfo.CreateTimeCCCD, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture);
                input.ClientInfo.CreateTimeCCCD = date1.ToString("dd/MM/yyyy");
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
