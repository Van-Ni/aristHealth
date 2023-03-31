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
    [AutoMapFrom(typeof(HistoryExport))]
    [AutoMapTo(typeof(HistoryExport))]
    public class HistoryExportDto : EntityDto<Guid>
    {
        public Guid ReportTemplateId { get; set; }
        public string FileExport { get; set; }
        public DateTime DateExport { get; set; }
        public string? Room { get; set; }
        public TemplateValue TemplateValue { get; set; }
        #region Audited
        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; }
        #endregion
        #region passivable
        public virtual bool IsActive { get; set; }
        #endregion
    }
}
