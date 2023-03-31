using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public class EnterpriseEditedHistory : Entity<string>, IFullAudited, IPassivable
    {
        public string Name { get; set; }
        public int LocationCode { get; set; }
        public string Address { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int EstablishYear { get; set; }
        public string BussinessType { get; set; }
        public string Representative { get; set; }
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
        #endregion
    }
}
