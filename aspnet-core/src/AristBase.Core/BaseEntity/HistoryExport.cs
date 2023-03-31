using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public class HistoryExport : Entity<Guid>, IFullAudited, IPassivable
    {
        [ForeignKey(nameof(ReportTemplate))]
        public Guid ReportTemplateId { get; set; }
        public ReportTemplate? ReportTemplate { get; set; }
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
