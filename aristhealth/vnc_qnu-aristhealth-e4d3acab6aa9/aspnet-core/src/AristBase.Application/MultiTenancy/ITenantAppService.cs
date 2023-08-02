using Abp.Application.Services;
using AristBase.MultiTenancy.Dto;

namespace AristBase.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

