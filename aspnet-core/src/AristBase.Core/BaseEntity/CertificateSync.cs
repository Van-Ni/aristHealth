using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using AristBase.BaseEntity.XML;
using System;

namespace AristBase.BaseEntity
{
    public class CertificateSync : Entity<int>, IFullAudited, IPassivable, ISoftDelete, IMustHaveTenant
    {
        public SyncStatus SyncStatus { get; set; }
        public CertificateDataSync MetaData { get; set; }
        public Guid CertificateId { get; set; }
        public string XmlEncrypted { get; set; }
        public virtual Certificate Certificate { get; set; }
        public bool EditState { get; set; } = false;
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
