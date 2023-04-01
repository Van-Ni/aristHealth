﻿using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public class Group : Entity<Guid>, IFullAudited, IPassivable, ISoftDelete, IMustHaveTenant
    {
        public string Name { get; set; }
        public virtual Department Department { get; set; }
        public Guid DepartmentId { get; set; }

        public virtual ICollection<CertificateKey> Certificates { get; set; }
        public virtual ICollection<DocterGroup> Docters { get; set; }
        public virtual ICollection<CertificateGroupStatus> CertificateGroupStatuses { get; set; }
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
