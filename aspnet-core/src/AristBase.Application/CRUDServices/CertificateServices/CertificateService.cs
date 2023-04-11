using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateServices.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateServices
{
    public class CertificateService : AsyncCrudAppService<Certificate, CertificateDto, Guid, PagedAndSortedResultRequestDto, CreateCertificateDto, UpdateCertificateDto>
    {
        public CertificateService(IRepository<Certificate, Guid> repository) : base(repository)
        {
        }
        public async override Task<PagedResultDto<CertificateDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Include(i => i.ClientInfo).Include(i => i.CertificateType);
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
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

            var entity = MapToEntity(input);

            await Repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
        }
    }
}
