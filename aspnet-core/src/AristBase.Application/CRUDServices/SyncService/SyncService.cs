using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.ApproveServices.Dto;

namespace AristBase.CRUDServices.SyncService
{
    public class SyncService : AsyncCrudPermissonAppService<CertificateSync, CertificateSyncDto, int>
    {
        public SyncService(IRepository<CertificateSync, int> repository) : base(repository, PermissionNames.Sync)
        {
        }
    }
}
