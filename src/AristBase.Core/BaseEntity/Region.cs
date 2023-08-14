using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public enum Level
    {
        TinhTp,
        HuyenTp,
        XaPhuong
    }
    public class Region: Entity<string>
    {
        public string Name { get; set; }
        //
        public string? ParentId {get;set;}
        public Region? ParentRegion { get; set; }
        //
        public virtual ICollection<Region>? ChildRegions { get; set;}

    }
}
