using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace AristBase.Authorization
{
    public class AristBaseAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.ChangePassword, L("ChangePassword"));
            context.CreatePermission(PermissionNames.PageReadIn, L("In"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            foreach (var page in PermissionNames.Pages)
            {
                var pagesPrefix = $"Pages.{page}";
                var departments = context.CreatePermission(pagesPrefix, L(page));
                var crud = new CRUDPermissionName(page);
                departments.CreateChildPermission(crud.Create, L("Create"));
                departments.CreateChildPermission(crud.Read, L("Read"));
                departments.CreateChildPermission(crud.Update, L("Update"));
                departments.CreateChildPermission(crud.Delete, L("Delete"));
            }
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, AristBaseConsts.LocalizationSourceName);
        }
    }
}
