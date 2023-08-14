using Abp.Authorization;
using AristBase.Authorization.Roles;
using AristBase.Authorization.Users;

namespace AristBase.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
