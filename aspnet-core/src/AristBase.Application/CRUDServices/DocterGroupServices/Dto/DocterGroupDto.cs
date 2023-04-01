using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.Authorization.Users;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.DocterGroupServices.Dto
{
    [AutoMapFrom(typeof(DocterGroup))]
    [AutoMapTo(typeof(DocterGroup))]
    public class DocterGroupDto : EntityDto<Guid>
    {
        public Guid GroupId { get; set; }
        public int UserId { get; set; }
    }
}
