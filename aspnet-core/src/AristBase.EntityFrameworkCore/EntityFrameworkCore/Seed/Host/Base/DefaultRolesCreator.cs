using Abp.Authorization.Roles;
using AristBase.Authorization;
using AristBase.Authorization.Roles;
using AristBase.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.EntityFrameworkCore.Seed.Host.Base
{
    public class DefaultRolesCreator : DefaultCreator<Role, int, AristBaseDbContext>
    {
        protected override List<Role> GetInitial()
        {
            var roles = PermissionNames.Pages.Select(p => new CRUDPermissionName(p)).Select(p => new Role
            {
                Name = p.BaseName,
                DisplayName = p.BaseName,
                Permissions = new List<RolePermissionSetting>
                {
                    new RolePermissionSetting
                    {
                        Name = p.Read,
                        IsGranted = true,
                    },

                    new RolePermissionSetting
                    {
                        Name = p.Create,
                        IsGranted = true,
                    },

                    new RolePermissionSetting
                    {
                        Name = p.Update,
                        IsGranted = true,
                    },

                    new RolePermissionSetting
                    {
                        Name = p.Delete,
                        IsGranted = true,
                    },
                }

            });


            return roles.ToList();
        }
        public DefaultRolesCreator(AristBaseDbContext context) : base(context)
        {
        }
    }
}