using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateTypeServices.Dto;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateTypeServices
{
    public class CertificateTypeService : AsyncCrudAppService<CertificateType, CertificateTypeDto, int, PagedAndSortedResultRequestDto, CreateCertificateTypeDto, CertificateTypeDto>
    {
        public CertificateTypeService(IRepository<CertificateType, int> repository) : base(repository)
        {
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
