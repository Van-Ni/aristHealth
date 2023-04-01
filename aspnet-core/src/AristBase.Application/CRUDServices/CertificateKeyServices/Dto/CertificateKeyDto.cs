using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateKeyServices.Dto
{
    [AutoMapFrom(typeof(CertificateKey))]
    [AutoMapTo(typeof(CertificateKey))]
    public class CertificateKeyDto : EntityDto<Guid>
    {
        public int CertificateTypeId { get; set; }
        public string Key { get; set; }
        public string Title { get; set; }
        public Guid GroupId { get; set; }
    }
}
