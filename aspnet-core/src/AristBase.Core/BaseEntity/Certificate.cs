﻿using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;

namespace AristBase.BaseEntity
{
    public class Certificate : Entity<Guid>, IFullAudited, IPassivable, ISoftDelete, IMustHaveTenant
    {
        public int CertificateTypeId { get; set; }
        public CertificateType CertificateType { get; set; }
        public Status Status { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public int ClientInfoId { get; set; }
        public ClientInfo ClientInfo { get; set; }
        public decimal AmountPaid { get; set; }
        public string Reason { get; set; }
        public string FileResult { get; set; }
        public virtual ICollection<CertificateGroupStatus> CertificateGroupStatuses { get; set; }
        public virtual ICollection<CertificateSync> CertificateSyncs { get; set; }

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
    public enum Status : byte
    {
        Start = 0,
        Processing = 1,
        Finish = 2,
    }
    public enum PaymentStatus : byte
    {
        Unpaid = 0,
        Paid = 1,
    }
}
