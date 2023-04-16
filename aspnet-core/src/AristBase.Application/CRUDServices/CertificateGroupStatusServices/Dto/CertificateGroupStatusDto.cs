using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.Authorization.Users;
using AristBase.BaseEntity;
using AristBase.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices.Dto
{
    [AutoMapFrom(typeof(CertificateGroupStatus))]
    [AutoMapTo(typeof(CertificateGroupStatus))]
    public class CertificateGroupStatusDto : EntityDto<Guid>
    {
        public Guid CertificateId { get; set; }
        public string Group { get; set; }
        public bool status { get; set; }
        public KeyValues Content { get; set; }
        public long UserId { get; set; }
        public UserDto User { get; set; }
    }
}
