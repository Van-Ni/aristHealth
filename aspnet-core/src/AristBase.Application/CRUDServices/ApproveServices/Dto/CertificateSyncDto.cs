using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using AristBase.BaseEntity.XML;
using Newtonsoft.Json;
using System;

namespace AristBase.CRUDServices.ApproveServices.Dto
{
    [AutoMapFrom(typeof(CertificateSync))]
    [AutoMapTo(typeof(CertificateSync))]
    public class CertificateSyncDto : EntityDto<int>
    {
        public SyncStatus SyncStatus { get; set; }
        public CertificateDataSync MetaData { get; set; }
        public Guid CertificateId { get; set; }
        public string XmlEncrypted { get; set; }
        public string XmlUnSign { get; set; }
        public virtual Certificate Certificate { get; set; }
        public DateTime CreationTime { get; set; }
    }

    [AutoMapFrom(typeof(CertificateDataSync))]
    [AutoMapTo(typeof(CertificateDataSync))]
    public class SyncRequestBody : CertificateDataSync
    {
        [JsonProperty("SIGNDATA")]
        public string SIGNDATA { get; set; }
    }

}
