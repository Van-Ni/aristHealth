﻿using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using Abp.Timing;

namespace AristBase.BaseEntity
{
    public class ClientInfo : IFullAudited, IPassivable, ISoftDelete, IMustHaveTenant
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        //Male = true
        public string Sex { get; set; }
        public string CCCD { get; set; }
        public string DateOfBirth { get; set; }
        public string CreateTimeCCCD { get; set; }
        public string AddressCCCD { get; set; }
        public string Address { get; set; }
        public string ProvinceId { get; set; }
        public string Province { get; set; }
        public string CommuneId { get; set; }
        public string Commune { get; set; }
        public string DistrictId { get; set; }
        public string District { get; set; }
        public string? GuardianName { get; set; }
        public string Year { get; private set; } = Clock.Now.ToString("yyyy");

        public string CameraCapturePath { get; set; }
        //public string? Avatar { get; set; }
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
}
