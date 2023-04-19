﻿using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.ApproveServices.Dto;
using AristBase.CRUDServices.CertificateServices.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ApproveServices
{
    public class ApproveService : ApplicationService
    {
        private readonly IRepository<CertificateSync, int> repository;
        private readonly IRepository<CertificateGroupStatus, Guid> repositoryGroupStatus;
        private readonly IRepository<Certificate, Guid> repositoryCertificate;

        public ApproveService(IRepository<CertificateSync, int> repository, IRepository<CertificateGroupStatus, Guid> repositoryGroupStatus, IRepository<Certificate, Guid> repositoryCertificate)
        {
            this.repository = repository;
            this.repositoryGroupStatus = repositoryGroupStatus;
            this.repositoryCertificate = repositoryCertificate;
        }
        public async ValueTask<CertificateSyncDto> GetAsync(int id)
        {
            var entity = await repository.GetAsync(id);
            return ObjectMapper.Map<CertificateSyncDto>(entity);
        }
        //To-Do: Check ketluanGroup status == submited
        public async ValueTask<CertificateDto> ApproveAsync(Guid cerId)
        {
            var klStatus = await repositoryGroupStatus.GetAll().AnyAsync(w => w.CertificateId == cerId && w.Status == GroupStatus.SUBMITTED && w.Group == PermissionNames.KetLuan);
            if (klStatus)
            {
                //
                var tdvApprove = await repositoryGroupStatus.SingleAsync(w => w.CertificateId == cerId && w.Group == PermissionNames.tdv);
                tdvApprove.Status = GroupStatus.SUBMITTED;
                tdvApprove.UserId = AbpSession.UserId;
                await repositoryGroupStatus.UpdateAsync(tdvApprove);
                //
                var queryCertificate = await repositoryCertificate.GetAll().Include(i => i.CertificateType).Where(w => w.Id == cerId).SingleAsync();
                queryCertificate.Status = Status.Finish;
                await repositoryCertificate.UpdateAsync(queryCertificate);
                await CurrentUnitOfWork.SaveChangesAsync();

                if (queryCertificate.CertificateType.IsNeedSync)
                {
                    var obj = new CreateCertificateSyncDto()
                    {
                        //var metadata = 
                        MetaData = { },
                        syncStatus = SyncStatus.done,
                        CertificateId = cerId
                    };
                    var queryCertificateSync = await repository.FirstOrDefaultAsync(i => i.CertificateId == cerId);
                    if (queryCertificateSync != null)
                    {
                        queryCertificateSync.syncStatus = SyncStatus.done;
                        queryCertificateSync.MetaData = obj.MetaData;
                        await repository.UpdateAsync(ObjectMapper.Map<CertificateSync>(queryCertificateSync));
                        await CurrentUnitOfWork.SaveChangesAsync();
                    }
                    else
                    {
                        await repository.InsertAsync(ObjectMapper.Map<CertificateSync>(obj));
                        await CurrentUnitOfWork.SaveChangesAsync();
                    }
                }
                return ObjectMapper.Map<CertificateDto>(queryCertificate);
            }
            throw new UserFriendlyException(L("ChuaKetLuan"));
        }
        public async ValueTask<CertificateDto> UnApproveAsync(Guid cerId)
        {
            var query = await repositoryCertificate.GetAll().Include(i => i.CertificateType).SingleAsync(id => id.Id == cerId);
            query.Status = Status.Start;
            var queryCertificateGr = await repositoryGroupStatus.GetAll().Where(i => i.CertificateId == cerId && (i.Group == PermissionNames.KetLuan || i.Group == PermissionNames.tdv)).ToListAsync();
            foreach (var item in queryCertificateGr)
            {
                item.Status = GroupStatus.UNREADY;
                await repositoryGroupStatus.UpdateAsync(item);
            }
            await repositoryCertificate.UpdateAsync(query);
            if (query.CertificateType.IsNeedSync)
            {
                var queryCertificateSync = await repository.SingleAsync(i => i.CertificateId == cerId);
                queryCertificateSync.syncStatus = SyncStatus.cancelled;
                await repository.UpdateAsync(queryCertificateSync);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<CertificateDto>(query);
            }
            return ObjectMapper.Map<CertificateDto>(query);
        }

    }
}
