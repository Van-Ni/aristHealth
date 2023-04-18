using Abp.Domain.Repositories;
using Abp.UI;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices
{
    public class GroupStatusService : KeyValueBaseService
    {
        public GroupStatusService(IRepository<CertificateGroupStatus, Guid> repository) : base(repository)
        {
        }
    }
    public class KetLuanServices : KeyValueBaseService
    {
        public KetLuanServices(IRepository<CertificateGroupStatus, Guid> repository) : base(repository)
        {
        }
        public override async ValueTask<CertificateGroupStatusDto> UpdateOrInsert(UpdateCertificateGroupStatusDto input)
        {
            var unreadyGr = await Repository.GetAll().Where(i => i.CertificateId == input.CertificateId && i.Status == GroupStatus.UNREADY).Select(i => i.Group).ToListAsync();
            if (unreadyGr.Count > 0)
            {
                try
                {
                    var message = L("Unready", string.Join(", ", unreadyGr));
                    throw new UserFriendlyException(message);
                }
                catch (Exception ex) { throw; }
            }
            return await base.UpdateOrInsert(input);
        }
    }
}
