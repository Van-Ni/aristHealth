using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using AristBase.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public class MedicationKeyResult : Entity<Guid>, IFullAudited, IPassivable, ISoftDelete, IMustHaveTenant
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Group { get; set; }
        public bool IsSeal { get; set; }
        public virtual Certificate Certificate { get; set; }
        public Guid CertificateId { get; set; }
        public virtual User User { get; set; }
        public long UserId { get; set; }


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
        public int TenantId { get; set; }
        #endregion
    }
}
