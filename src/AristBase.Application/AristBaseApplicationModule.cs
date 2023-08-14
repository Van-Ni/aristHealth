using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AristBase.Authorization;
using System;

namespace AristBase
{
    [DependsOn(
        typeof(AristBaseCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class AristBaseApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<AristBaseAuthorizationProvider>();
            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.Caching.ConfigureAll(cache =>
            {
                cache.DefaultSlidingExpireTime = TimeSpan.FromHours(4);
            });
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(AristBaseApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
