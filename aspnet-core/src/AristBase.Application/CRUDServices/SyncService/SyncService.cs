using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.ApproveServices.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace AristBase.CRUDServices.SyncService
{
    public class SyncService : AsyncCrudPermissonAppService<CertificateSync, CertificateSyncDto, int>
    {
        public SyncService(IRepository<CertificateSync, int> repository) : base(repository, PermissionNames.Sync)
        {
        }
        public async Task<CertificateSyncDto> GetSyncCertificate()
        {
            CheckGetAllPermission();
            var result = await Repository.GetAll().Where(c=>c.SyncStatus == SyncStatus.init).OrderBy(c=>c.CreationTime).FirstOrDefaultAsync();

            var xmlDto =  MapToEntityDto(result);
            xmlDto.XmlUnSign = ToXMLString(xmlDto);
            return xmlDto;
        }
        string ToXMLString(CertificateSyncDto certificateSync)
        {
            using (var stringwriter = new System.IO.StringWriter())
            {
                var serializer = new XmlSerializer(certificateSync.MetaData.GetType());
                serializer.Serialize(stringwriter, certificateSync.MetaData);
                return stringwriter.ToString();
            }
        }
        public async Task UpdateXmlSyncSyncCertificate(UpdateSyncRequest certificateSync)
        {
            CheckUpdatePermission();
            var result = await Repository.GetAll().Where(c => c.Id == certificateSync.Id && c.SyncStatus == SyncStatus.init).FirstOrDefaultAsync();
            result.XmlEncrypted = certificateSync.XmlEncrypted;
            result.SyncStatus = SyncStatus.readyToSync;
        }
    }
}
