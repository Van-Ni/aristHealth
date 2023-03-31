using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;

namespace AristBase.BaseEntity
{
    public class ReportTemplate : Entity<Guid>, IFullAudited, IPassivable
    {
        public string FilePath { get; set; }
        public TemplateDescription TemplateDescription { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
    }
}
