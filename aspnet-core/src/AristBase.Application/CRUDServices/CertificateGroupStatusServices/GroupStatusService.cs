using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using AristBase.Authorization;
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
            var unreadyGr = await Repository.GetAll().Where(i => i.CertificateId == input.CertificateId && i.Status == GroupStatus.UNREADY && i.Group != PermissionNames.KetLuan && i.Group != PermissionNames.tdv).Select(i => i.Group).ToListAsync();
            if (unreadyGr.Count > 0)
            {
                var message = L("Unready", string.Join(", ", unreadyGr));
                throw new UserFriendlyException(message);
            }
            return await base.UpdateOrInsert(input);
        }
        public async ValueTask<CertificateGroupStatusDto> HuyKetLuan(UpdateCertificateGroupStatusDto input)
        {
            var check = await Repository.GetAll().SingleAsync(i => i.CertificateId == input.CertificateId 
            && i.Group == PermissionNames.tdv);
            if(check.Status != GroupStatus.SUBMITTED)
            {
                var getData = await Repository.GetAll().SingleAsync(i => i.CertificateId == input.CertificateId
                 && i.Group == PermissionNames.KetLuan);
                getData.Status = GroupStatus.UNREADY;
                await Repository.UpdateAsync(getData);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<CertificateGroupStatusDto>(getData);
            }
            throw new UserFriendlyException("Đã duyệt nên không thể hủy kết luận.");

        }
    }
}
