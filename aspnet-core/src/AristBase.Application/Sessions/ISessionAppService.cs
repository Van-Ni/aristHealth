using System.Threading.Tasks;
using Abp.Application.Services;
using AristBase.Sessions.Dto;

namespace AristBase.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
