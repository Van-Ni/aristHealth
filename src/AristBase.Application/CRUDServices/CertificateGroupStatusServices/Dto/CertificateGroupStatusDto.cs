using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.Users.Dto;
using System;
using System.Collections.Generic;

namespace AristBase.CRUDServices.CertificateGroupStatusServices.Dto
{
    [AutoMapFrom(typeof(CertificateGroupStatus))]
    [AutoMapTo(typeof(CertificateGroupStatus))]
    public class CertificateGroupStatusDto : EntityDto<Guid>
    {
        public Guid CertificateId { get; set; }
        public  CertificateDto Certificate { get; set; } 
        public Dictionary<string, Values> Content { get; set; }
        public string Group { get; set; }
        public GroupStatus Status { get; set; }
        public long? UserId { get; set; }
        public UserDto User { get; set; }
    }
    [AutoMapFrom(typeof(CertificateGroupStatus))]
    public class CertificateGroupStatusToPrintDto
    {
        public Dictionary<string, Values> Content { get; set; }
        public string Group { get; set; }
        public GroupStatus Status { get; set; }
        public UserDto User { get; set; }
        public DateTime? LastModificationTime { get; set; }
    }
}
