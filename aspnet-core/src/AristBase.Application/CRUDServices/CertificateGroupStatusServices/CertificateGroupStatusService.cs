using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using AristBase.CRUDServices.CertificateServices;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.Extensions;
using AristBase.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices
{
    public class CertificateGroupStatusService : AsyncCrudAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, Guid, CreateCertificateGroupStatusDto, CertificateGroupStatusDto>
    {
        public CertificateGroupStatusService(IRepository<CertificateGroupStatus, Guid> repository) : base(repository)
        {
        }
        public async override Task<PagedResultDto<CertificateGroupStatusDto>> GetAllAsync(Guid input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Where(w => w.CertificateId == input).Include(i => i.User);
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateGroupStatusDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public override async Task<CertificateGroupStatusDto> CreateAsync(CreateCertificateGroupStatusDto input)
        {
            var getData = await Repository.GetAll().FirstOrDefaultAsync(w => w.CertificateId == input.CertificateId && w.Group == "cdv");
            if (getData != null)
            {
                throw new InvalidOperationException();
            }
            return await base.CreateAsync(input);
        }
    }

    public class GetDataService : AsyncCrudAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, PagedAndSortedAndSearchAndDateAndCerResultDto>
    {
        public GetDataService(IRepository<CertificateGroupStatus, Guid> repository)
            : base(repository)
        {
        }
        public async override Task<PagedResultDto<CertificateGroupStatusDto>> GetAllAsync(PagedAndSortedAndSearchAndDateAndCerResultDto input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Include(i => i.Certificate).ThenInclude(i => i.CertificateType)
                .Include(i => i.Certificate).ThenInclude(i => i.ClientInfo).WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Certificate.ClientInfo.FullName.Contains(input.Keyword)
                || x.Certificate.CertificateType.Name.Contains(input.Keyword)
                || x.Certificate.ClientInfo.CCCD.Contains(input.Keyword)
                );
            query = query.Where(w => w.Certificate.CertificateTypeId == input.CertificateTypeId);
            if (input.DateFrom != DateTime.MinValue)
            {
                query = query.Where(w => w.Certificate.CreationTime.Date >= input.DateFrom.Date);
            }
            if (input.DateTo != DateTime.MinValue)
            {
                query = query.Where(w => w.Certificate.CreationTime.Date <= input.DateTo.Date);
            }
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateGroupStatusDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public async Task<FileContentResult> GetExportCsvList(PagedAndSortedAndSearchAndDateAndCerResultDto input)
        {
            var certificategrs = await GetAllAsync(input);
            var certificategrsList = certificategrs.Items.Where(x => x.Group == "xetnghiemmau" || x.Group == "xetnghiemnuoctieu").ToList();
            //var certificategr = certificategrs.Items.Select(e => new CertificateGroupStatusCSVDto
            //{
            foreach(var certificategr in certificategrsList)
            {

            }
            //}).ToList();
            //var data = ExportExcelCSV.ExportToCsv(certificate);
            //var fileName = "Certificate.csv";
            //return new FileContentResult(data, "text/csv") { FileDownloadName = fileName };
            return null;
        }
        public async ValueTask<IEnumerable<CertificateGroupStatusDto>> GetDataAllAsync(Guid id)
        {
            CheckGetAllPermission();
            var entities = await Repository.GetAll().Where(w => w.CertificateId == id).ToListAsync();

            return ObjectMapper.Map<IEnumerable<CertificateGroupStatusDto>>(entities);
        }
        public override Task<CertificateGroupStatusDto> CreateAsync(CertificateGroupStatusDto input)
        {
            throw new NotImplementedException();
        }
        public override Task DeleteAsync(EntityDto<Guid> input)
        {
            throw new NotImplementedException();
        }
        public override Task<CertificateGroupStatusDto> UpdateAsync(CertificateGroupStatusDto input)
        {
            throw new NotImplementedException();
        }
    }
}
