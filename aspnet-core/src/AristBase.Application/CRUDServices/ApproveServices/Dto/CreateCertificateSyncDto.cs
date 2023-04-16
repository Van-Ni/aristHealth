using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.ApproveServices.Dto
{
    [AutoMapFrom(typeof(CertificateSync))]
    [AutoMapTo(typeof(CertificateSync))]
    internal class CreateCertificateSyncDto
    {
        public int SyncId { get; set; }
        public SyncStatus syncStatus { get; set; }
        public string MetaData { get; set; }
        public Guid CertificateId { get; set; }
        public string XmlEncrypted { get; set; }
        public virtual Certificate Certificate { get; set; }
        public string Conclusion { get; set; }
    }
}
