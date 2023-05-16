using Abp.Application.Services;
using Abp.Authorization;
using Abp.Dependency;
using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.Services.Caching;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.Threading.Tasks;
using Abp.UI;

namespace AristBase.CRUDServices.TenantSettingSerivce
{
    //[AutoMapFrom(typeof(HospitalSetting))]
    [AutoMapFrom(typeof(HospitalSettingCacheItem))]
    [AutoMapTo(typeof(HospitalSetting))]
    public class HospitalSettingDto : EntityDto<int>
    {
        public string IdHospital { get; set; }
        public string HospitalBranchName { get; set; }
        public string HospitalBaseDepartment { get; set; }
        public string UserName { get; set; }
        public string PasswordMD5 { get; set; }
        public string NormalTile { get; set; }
        public string DriverLicenseTile { get; set; }
    }
    public class HospitalSettingService : ApplicationService, ITransientDependency
    {
        private readonly IRepository<HospitalSetting> _repository;
        private readonly IHospitalSettingCache _hospitalSettingCache;

        public HospitalSettingService(IRepository<HospitalSetting> repository, IHospitalSettingCache hospitalSettingCache)
        {
            this._repository = repository;
            this._hospitalSettingCache = hospitalSettingCache;
        }


        [AbpAuthorize($"Pages.{PermissionNames.Setting}.Read")]
        public async ValueTask<HospitalSettingDto> GetSetting()
        {
            var tenantId = AbpSession.TenantId.Value;
            var setting = await _hospitalSettingCache.GetAsync(tenantId);
            return ObjectMapper.Map<HospitalSettingDto>(setting);
        }
        [AbpAuthorize($"Pages.{PermissionNames.Setting}.Update")]
        public async ValueTask<HospitalSettingDto> AddOrUpdateSetting(HospitalSettingDto hospitalSettingDto)
        {
            var tenantId = AbpSession.TenantId.Value;
            if (hospitalSettingDto.Id != tenantId)
            {
                throw new UserFriendlyException("CannotUpdateSetting");
            }
            var entity = ObjectMapper.Map<HospitalSetting>(hospitalSettingDto);
            await _repository.InsertOrUpdateAsync(entity);
            return hospitalSettingDto;
        }
    }
}
