using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AristBase.Configuration;

namespace AristBase.Web.Host.Startup
{
    [DependsOn(
       typeof(AristBaseWebCoreModule))]
    public class AristBaseWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AristBaseWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AristBaseWebHostModule).GetAssembly());
        }
    }
}
