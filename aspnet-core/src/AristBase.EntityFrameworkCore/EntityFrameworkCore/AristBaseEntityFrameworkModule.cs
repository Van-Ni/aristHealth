using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using AristBase.EntityFrameworkCore.Seed;

namespace AristBase.EntityFrameworkCore
{
    [DependsOn(
        typeof(AristBaseCoreModule), 
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class AristBaseEntityFrameworkModule : AbpModule
    {
        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; } = true;

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<AristBaseDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        AristBaseDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        AristBaseDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AristBaseEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
                SeedHelper.GetAndSeedTenantDb(IocManager);
            }
        }
    }
}
