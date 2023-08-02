using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AristBase.EntityFrameworkCore;
using AristBase.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace AristBase.Web.Tests
{
    [DependsOn(
        typeof(AristBaseWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class AristBaseWebTestModule : AbpModule
    {
        public AristBaseWebTestModule(AristBaseEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AristBaseWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(AristBaseWebMvcModule).Assembly);
        }
    }
}