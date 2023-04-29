using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AristBase.Authorization.Users;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.CRUDServices.HistoryExportServices.Dto;
using AristBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.HistoryExportServices
{
    public class HistoryExportService : AsyncCrudAppService<HistoryExport, HistoryExportDto, Guid, PagedAndSortedAndSearchAndDateResultDto>
    {
        public HistoryExportService(IRepository<HistoryExport, Guid> repository) : base(repository)
        {
        }
        public async override Task<PagedResultDto<HistoryExportDto>> GetAllAsync(PagedAndSortedAndSearchAndDateResultDto input)
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
            query = query.Include(i => i.User).WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.User.FullName.Contains(input.Keyword)
                || x.Type.Contains(input.Keyword)
                );
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<HistoryExportDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
    }
}
