using System.Threading.Tasks;
using Abp.Application.Services;
using AristBase.Authorization.Accounts.Dto;

namespace AristBase.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
