using System;
using Abp.Dependency;
using Abp.Domain.Entities.Caching;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Runtime.Caching;
using AristBase.BaseEntity;

namespace AristBase.Services.Caching
{
    public class HospitalSettingCache : EntityCache<HospitalSetting, HospitalSettingCacheItem>, IHospitalSettingCache, ITransientDependency
    {
        public HospitalSettingCache(ICacheManager cacheManager, IRepository<HospitalSetting> repository, IUnitOfWorkManager unitOfWorkManager)
            : base(cacheManager, repository, unitOfWorkManager)
        {

        }
        public override HospitalSettingCacheItem Get(int id)
        {
            try
            {

                return base.Get(id);
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }
    }
}
