using Abp.AutoMapper;
using AristBase.BaseEntity;
using System.ComponentModel.DataAnnotations.Schema;

namespace AristBase.Services.Caching
{
    [AutoMapFrom(typeof(HospitalSetting))]
    public class HospitalSettingCacheItem
    {
        [ForeignKey("Tenant")]
        public int Id { get; set; }
        public string IdHospital { get; set; }
        public string HospitalBranchName { get; set; }
        public string HospitalBaseDepartment { get; set; }
        public string UserName { get; set; }
        public string PasswordMD5 { get; set; }
        public string NormalTile { get; set; }
        public string DriverLicenseTile { get; set; }
    }
}
