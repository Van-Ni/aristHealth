using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;

namespace AristBase.BaseEntity
{
    public class CertificateType : Entity<int>, IFullAudited, IPassivable, ISoftDelete, IMustHaveTenant
    {
        public decimal Price { get; set; }
        public string Name { get; set; }
        public bool IsNeedSync { get; set; }
        public List<TemplateGroup> TemplateGroups { get; set; }
        public string FilePath { get; set; }
        public string FinalResult { get; set; }
        public virtual ICollection<Certificate> Certificates { get; set; }
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
    //public enum Type : byte
    //{
    //    Type1 = 1,
    //    Type2 = 2,
    //    Type3 = 3,
    //}
    public class TemplateGroup
    {
        public string GroupName { get; set; }
        public GroupStatus DefaultStatus { get; set; }
        public Dictionary<string, Values> DefaultContent { get; set; }
    }
  
}
