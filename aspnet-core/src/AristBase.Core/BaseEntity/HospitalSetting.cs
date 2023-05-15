using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using AristBase.MultiTenancy;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AristBase.BaseEntity
{
    public class HospitalSetting: Entity<int>, IPassivable, IAudited
    {
        [ForeignKey("Tenant")]
        public int Id { get; set; }
        public virtual Tenant Tenant { get; set; }
        public string IdHospital { get; set; }
        public string HospitalBranchName { get; set; }
        public string HospitalBaseDepartment { get; set; }
        public string UserName { get; set; }
        public string PasswordMD5 { get; set; }
        public string NormalTile { get; set; }
        public string DriverLicenseTile { get; set; }
        public bool IsActive { get ; set ; }
        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
    }
}
