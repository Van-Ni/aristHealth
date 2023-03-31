using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public class EnterpriseTax : Entity<Guid>, IFullAudited, IPassivable, QuarterYear
    {
        public double VATTax { get; set; }
        public string IncomeTax { get; set; }
        public string ImportExportTax { get; set; }
        public string OrtherTax { get; set; }
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
