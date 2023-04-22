﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.Interfaces;
using CsvHelper;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using iText.Layout.Element;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Globalization;
using System.IO;
using System.IO.Packaging;
using System.Linq;
using System.Threading.Tasks;


namespace AristBase.CRUDServices.CertificateServices
{
    public class CertificateService : AsyncCrudAppService<Certificate, CertificateDto, Guid, PagedAndSortedAndSearchResultDto, CreateCertificateDto, UpdateCertificateDto>
    {
        private readonly IRepository<CertificateType, int> _cerTypeRepo;
        private readonly IRepository<CertificateGroupStatus, Guid> _cerGroupStatus;

        public CertificateService(
            IRepository<Certificate, Guid> repository,
            IRepository<CertificateType, int> cerTypeRepo
,
            IRepository<CertificateGroupStatus, Guid> cerGroupStatus
            ) : base(repository)
        {
            _cerTypeRepo = cerTypeRepo;
            _cerGroupStatus = cerGroupStatus;
        }
        public async override Task<PagedResultDto<CertificateDto>> GetAllAsync(PagedAndSortedAndSearchResultDto input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Include(i => i.ClientInfo).Include(i => i.CertificateType).Include(i => i.CertificateType).WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.ClientInfo.FullName.Contains(input.Keyword)
                || x.CertificateType.Name.Contains(input.Keyword)
                || x.ClientInfo.CCCD.Contains(input.Keyword)
                );
            if (input.DateFrom != DateTime.MinValue)
            {
                query.Where(w => w.CreationTime == input.DateFrom);
            }
            if (input.DateTo != DateTime.MinValue)
            {
                query.Where(w => w.CreationTime == input.DateTo);
            }
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public byte[] ExportToCsv(List<CertificateDto> certificates)
        {
            using (var memoryStream = new MemoryStream())
            {
                using (var writer = new StreamWriter(memoryStream))
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                    csv.WriteRecords(certificates);
                }
                return memoryStream.ToArray();
            }
        }
        public async Task<FileContentResult> GetExportCsvList(PagedAndSortedAndSearchResultDto input)
        {
            var certificates = await GetAllAsync(input);
            var certificate = certificates.Items.Select(e => ObjectMapper.Map<CertificateDto>(e)).ToList();
            var data = ExportToCsv(certificate);
            var fileName = "Certificate.csv";
            return new FileContentResult(data, "text/csv") { FileDownloadName = fileName };
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
