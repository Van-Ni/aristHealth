using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.RegionsServices.Dto
{
    [AutoMapFrom(typeof(Region))]
    [AutoMapTo(typeof(Region))]

    public class RegionDto : EntityDto<string>
    {
        public string? ParentId { get; set; }
        public string Name { get; set; }
    }
    public class RegionFull
    {
        public RegionDto Province { get; set; }
        public RegionDto Dictrict { get; set; }
        public RegionDto Commute { get; set; }
    }
}
