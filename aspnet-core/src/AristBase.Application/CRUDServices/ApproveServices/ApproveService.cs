using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.BaseEntity.XML;
using AristBase.CRUDServices.ApproveServices.Dto;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ApproveServices
{
    public class ApproveService : ApplicationService
    {
        private readonly IRepository<CertificateSync, int> repository;
        private readonly IRepository<CertificateGroupStatus, Guid> repositoryGroupStatus;
        private readonly IRepository<Certificate, Guid> repositoryCertificate;

        public ApproveService(IRepository<CertificateSync, int> repository,
                              IRepository<CertificateGroupStatus, Guid> repositoryGroupStatus,
                              IRepository<Certificate, Guid> repositoryCertificate)
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
        [AbpAuthorize($"Pages.{PermissionNames.tdv}.Create")]
        public async ValueTask<CertificateDto> ApproveAsync(Guid cerId)
        {
            try
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
                    var certificate = await repositoryCertificate.GetAll().Include(i => i.CertificateType).Include(c => c.ClientInfo).Where(w => w.Id == cerId).SingleAsync();
                    certificate.Status = Status.Finish;
                    await repositoryCertificate.UpdateAsync(certificate);
                    await CurrentUnitOfWork.SaveChangesAsync();

                    if (certificate.CertificateType.IsNeedSync)
                    {

                        var obj = new CreateCertificateSyncDto()
                        {
                            syncStatus = SyncStatus.init,
                            CertificateId = cerId
                        };
                        var certificateSync = await repository.FirstOrDefaultAsync(i => i.CertificateId == cerId);
                        if (certificateSync != null)
                        {
                            certificateSync.SyncStatus = SyncStatus.init;
                            await repository.UpdateAsync(certificateSync);
                            await CurrentUnitOfWork.SaveChangesAsync();
                        }
                        else
                        {
                            certificateSync = ObjectMapper.Map<CertificateSync>(obj);
                            await repository.InsertAsync(certificateSync);
                            await CurrentUnitOfWork.SaveChangesAsync();
                        }
                        var groups = new List<string>()
                    {
                        PermissionNames.KetLuan,
                        PermissionNames.tdv,
                        PermissionNames.XetNghiemMaTuyVaMau
                    };
                        var dataDic = await repositoryGroupStatus.GetAll()
                            .Where(c => c.CertificateId == cerId)
                            .Where(c => groups.Contains(c.Group))
                            .Include(c => c.User)
                            .ToDictionaryAsync(c => c.Group, c => c);
                        var syncXml = new CertificateDataSync()
                        {
                            SO = SyncHelper.GetNumberTitle(certificate.ClientInfo.Id, SyncHelper.IDBV),
                            NGAYKHAM = dataDic[PermissionNames.KetLuan].LastModificationTime.Value.ToVNTime().ToString("dd/MM/yyyy"),
                            HOTEN = certificate.ClientInfo.FullName,
                            GIOITINHVAL = certificate.ClientInfo.Sex == "nam" ? "0" : "1",
                            NGAYSINH = certificate.ClientInfo.DateOfBirth,
                            DIACHITHUONGTRU = certificate.ClientInfo.Province,
                            MATINH_THUONGTRU = certificate.ClientInfo.ProvinceId,
                            MAHUYEN_THUONGTRU = certificate.ClientInfo.DistrictId,
                            MAXA_THUONGTRU = certificate.ClientInfo.CommuneId,
                            SOCMND_PASSPORT = certificate.ClientInfo.CCCD,
                            NGAYTHANGNAMCAPCMND = certificate.ClientInfo.CreateTimeCCCD,
                            NOICAP = certificate.ClientInfo.AddressCCCD,
                            HANGBANGLAI = certificate.Reason,
                            IDBENHVIEN = SyncHelper.IDBV,
                            BENHVIEN = SyncHelper.TenBV,
                            NGAYKETLUAN = dataDic[PermissionNames.KetLuan].LastModificationTime.Value.ToVNTime().ToString("dd/MM/yyyy"),
                            NONGDOCON = dataDic[PermissionNames.XetNghiemMaTuyVaMau].Content["text_nongdomau"].Value.Replace("mg/l", "").Trim(),
                            DVINONGDOCON = "1",
                            MATUY = SyncHelper.GetRealValue(dataDic[PermissionNames.XetNghiemMaTuyVaMau].Content["text_morphin"]),
                            BACSYKETLUAN = dataDic[PermissionNames.tdv].User.FullName,
                            KETLUAN = dataDic[PermissionNames.KetLuan].Content["text_ketluan"].RealValue,
                            NGAYKHAMLAI = dataDic[PermissionNames.KetLuan].Content["text_ngaykhamlai"].Value != "Invalid date" ? dataDic[PermissionNames.KetLuan].Content["text_ngaykhamlai"].Value : "",
                            LYDO = dataDic[PermissionNames.KetLuan].Content["text_lydokham"].Value,
                            TINHTRANGBENH = "",
                            STATE = certificateSync.EditState ? "EDIT" : "ADD",
                        };
                        certificateSync.MetaData = syncXml;
                        await repository.UpdateAsync(certificateSync);
                    }
                    return ObjectMapper.Map<CertificateDto>(certificate);
                }
                throw new UserFriendlyException(L("ChuaKetLuan"));
            }
            catch (Exception e)
            {

                throw e;
            }
            
        }
        [AbpAuthorize($"Pages.{PermissionNames.tdv}.Update")]
        public async ValueTask<CertificateDto> UnApproveAsync(Guid cerId)
        {
            var query = await repositoryCertificate.GetAll().Include(i => i.CertificateType).SingleAsync(id => id.Id == cerId);
            query.Status = Status.Start;
            query.FileResult = "";
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
                queryCertificateSync.EditState = queryCertificateSync.EditState || queryCertificateSync.SyncStatus == SyncStatus.done;
                queryCertificateSync.SyncStatus = SyncStatus.cancelled;
                await repository.UpdateAsync(queryCertificateSync);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<CertificateDto>(query);
            }
            return ObjectMapper.Map<CertificateDto>(query);
        }

    }
}
