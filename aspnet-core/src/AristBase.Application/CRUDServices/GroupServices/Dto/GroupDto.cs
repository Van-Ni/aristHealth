using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.GroupServices.Dto
{
    [AutoMapFrom(typeof(Group))]
    [AutoMapTo(typeof(Group))]
    public class GroupDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public Guid DepartmentId { get; set; }
    }
}
