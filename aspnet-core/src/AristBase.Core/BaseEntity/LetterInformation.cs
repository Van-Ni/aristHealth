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
    public class LetterInformation : Entity<Guid>, IFullAudited, IPassivable, QuarterYear
    {
        public virtual Enterprise Enterprise { get; set; }
        public string EnterpriseId { get; set; }
        public string Quantity { get; set; }
        public string Revenue { get; set; }
        public string QuantityEcommerce { get; set; }
        public string RevenueEcommerce { get; set; }
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
