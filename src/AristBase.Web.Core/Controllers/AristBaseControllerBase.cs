using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace AristBase.Controllers
{
    public abstract class AristBaseControllerBase: AbpController
    {
        protected AristBaseControllerBase()
        {
            LocalizationSourceName = AristBaseConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
