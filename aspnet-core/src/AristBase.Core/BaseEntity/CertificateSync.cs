using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public class CertificateSync : Entity<int>, IFullAudited, IPassivable, ISoftDelete, IMustHaveTenant
    {
        public int SyncId { get; set; }
        public SyncStatus syncStatus { get; set; }
        public string MetaData { get; set; }
        public Guid CertificateId { get; set; }
        public string XmlEncrypted { get; set; }
        public virtual Certificate Certificate { get; set; }
        public string Conclusion { get; set; }
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
    public enum SyncStatus
    {
        init = 0,
        done = 1,
        failed = 2,
        cancelled = 3,
    }
}
