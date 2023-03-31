using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;

namespace AristBase.BaseEntity
{
    public class EnterpriseRevenue : Entity<Guid>, IFullAudited, IPassivable, QuarterYear
    {
        public string Value { get; set; }
        public string ProfixAfterTax { get; set; }
        public string Revenue { get; set; }
        public virtual Enterprise Enterprise { get; set; }
        public string EnterpriseId { get; set; }
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
        public int Quarter { get; set; }
        public int Year { get; set; }
        #endregion
    }
}
