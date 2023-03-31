﻿using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.BaseEntity
{
    public class EnterprisePropertyByTime : Entity<Guid>, IFullAudited, IPassivable
    {
        public virtual Enterprise Enterprise { get; set; }
        public string EnterpriseId { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual PropertyType PropertyType { get; set; }
        public Guid PropertyTypeId { get; set; }

      
        public virtual PropertyTypeValue PropertyTypeValue { get; set; }
        public Guid PropertyTypeValueId { get; set; }
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
