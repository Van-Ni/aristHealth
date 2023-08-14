using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.CRUDServices.CertificateTypeServices.Dto;
using AristBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateTypeServices
{
    public class CertificateTypeService : AsyncCrudAppService<CertificateType, CertificateTypeDto, int, PagedAndSortedAndSearchResultDto, CreateCertificateTypeDto, CertificateTypeDto>
    {
        public CertificateTypeService(IRepository<CertificateType, int> repository) : base(repository)
        {
        }
        public override async Task<CertificateTypeDto> GetAsync(EntityDto<int> input)
        {
            CheckGetPermission();
            var entity = await Repository.GetAll().Where(t=>t.TypeName == (TypeName)(input.Id)).FirstAsync();
            return MapToEntityDto(entity);
        }
        public override async Task<PagedResultDto<CertificateTypeDto>> GetAllAsync(PagedAndSortedAndSearchResultDto input)
        {
            var query = CreateFilteredQuery(input);
            query = query.WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.Name.Contains(input.Keyword)
                || x.Price.ToString().Contains(input.Keyword));
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateTypeDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public async Task<CertificateTypeDto> UpdatePriceAsync(int typeId, decimal price)
        {
            CheckUpdatePermission();

            var entity = await GetEntityByIdAsync(typeId);
            entity.Price = price;
            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
        }
    }
}
