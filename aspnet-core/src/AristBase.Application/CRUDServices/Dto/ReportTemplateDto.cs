using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.Dto
{
    [AutoMapFrom(typeof(ReportTemplate))]
    [AutoMapTo(typeof(ReportTemplate))]
    public class ReportTemplateDto : EntityDto<Guid>
    {
        public string FilePath { get; set; }
        public TemplateDescription TemplateDescription { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get ; set ; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
    }
}
