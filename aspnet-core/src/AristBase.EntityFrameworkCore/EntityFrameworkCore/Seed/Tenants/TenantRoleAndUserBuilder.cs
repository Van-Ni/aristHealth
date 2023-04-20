using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.Authorization.Users;
using Abp.MultiTenancy;
using AristBase.Authorization;
using AristBase.Authorization.Roles;
using AristBase.Authorization.Users;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AristBase.EntityFrameworkCore.Seed.Tenants
{
    public class TenantRoleAndUserBuilder
    {
        private readonly AristBaseDbContext _context;
        private readonly int _tenantId;

        public TenantRoleAndUserBuilder(AristBaseDbContext context, int tenantId)
        {
            _context = context;
            _tenantId = tenantId;
        }

        public void Create()
        {
            CreateRolesAndUsers();
        }

        private void CreateRolesAndUsers()
        {
            var adminRole = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == _tenantId && r.Name == StaticRoleNames.Tenants.Admin);
            if (adminRole == null)
            {
                adminRole = _context.Roles.Add(new Role(_tenantId, StaticRoleNames.Tenants.Admin, StaticRoleNames.Tenants.Admin) { IsStatic = true }).Entity;
                _context.SaveChanges();
            }

            // Grant all permissions to admin role

            var grantedPermissions = _context.Permissions.IgnoreQueryFilters()
                .OfType<RolePermissionSetting>()
                .Where(p => p.TenantId == _tenantId && p.RoleId == adminRole.Id)
                .Select(p => p.Name)
                .ToList();

            var permissions = PermissionFinder
                .GetAllPermissions(new AristBaseAuthorizationProvider())
                .Where(p => p.MultiTenancySides.HasFlag(MultiTenancySides.Tenant) &&
                            !grantedPermissions.Contains(p.Name))
                .ToList();

            if (permissions.Any())
            {
                _context.Permissions.AddRange(
                    permissions.Select(permission => new RolePermissionSetting
                    {
                        TenantId = _tenantId,
                        Name = permission.Name,
                        IsGranted = true,
                        RoleId = adminRole.Id
                    })
                );
                _context.SaveChanges();
            }

            // Admin user

            var adminUser = _context.Users.IgnoreQueryFilters().FirstOrDefault(u => u.TenantId == _tenantId && u.UserName == AbpUserBase.AdminUserName);
            if (adminUser == null)
            {
                adminUser = User.CreateTenantAdminUser(_tenantId, "admin@defaulttenant.com");
                adminUser.Password = new PasswordHasher<User>(new OptionsWrapper<PasswordHasherOptions>(new PasswordHasherOptions())).HashPassword(adminUser, "123qwe");
                adminUser.IsEmailConfirmed = true;
                adminUser.IsActive = true;

                _context.Users.Add(adminUser);
                _context.SaveChanges();

                // Assign Admin role to admin user
                _context.UserRoles.Add(new UserRole(_tenantId, adminUser.Id, adminRole.Id));
                _context.SaveChanges();
            }
        }
    }
    public class TenantRoleBuilder
    {
        private readonly AristBaseDbContext _context;
        private readonly int _tenantId;

        public TenantRoleBuilder(AristBaseDbContext context, int tenantId)
        {
            _context = context;
            _tenantId = tenantId;
        }

        public void Create()
        {
            CreateRolesAndUsers();
        }

        private void CreateRolesAndUsers()
        {
            // Admin role
            foreach (var rl in PermissionNames.Pages.Select(r => new CRUDPermissionName(r)))
            {
                var roleForHost = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == _tenantId && r.Name == rl.BaseName);
                if (roleForHost == null)
                {
                    roleForHost = _context.Roles.Add(new Role(_tenantId, rl.BaseName, rl.BaseName) { IsStatic = true, IsDefault = true }).Entity;
                    _context.SaveChanges();
                }
                var grantedPermissions = _context.Permissions.IgnoreQueryFilters()
                .OfType<RolePermissionSetting>()
                .Where(p => p.TenantId == _tenantId && p.RoleId == roleForHost.Id)
                .Select(p => p.Name)
                .ToList();
                var allPermission = new List<string>
                {
                    rl.Delete,
                    rl.Create,
                    rl.Update,
                    rl.Read,
                    rl.Page
                };
                var permissions = PermissionFinder
                    .GetAllPermissions(new AristBaseAuthorizationProvider())
                    .Where(p => p.MultiTenancySides.HasFlag(MultiTenancySides.Tenant) &&
                                !grantedPermissions.Contains(p.Name))
                    .Where(p=>allPermission.Contains(p.Name))
                    .ToList();

                if (permissions.Any())
                {
                    _context.Permissions.AddRange(
                        permissions.Select(permission => new RolePermissionSetting
                        {
                            TenantId = _tenantId,
                            Name = permission.Name,
                            IsGranted = true,
                            RoleId = roleForHost.Id
                        })
                    );
                    _context.SaveChanges();
                }

            }


            // Grant all permissions to admin role

            

            // Admin user

            //var adminUser = _context.Users.IgnoreQueryFilters().FirstOrDefault(u => u.TenantId == _tenantId && u.UserName == AbpUserBase.AdminUserName);
            //if (adminUser == null)
            //{
            //    adminUser = User.CreateTenantAdminUser(_tenantId, "admin@defaulttenant.com");
            //    adminUser.Password = new PasswordHasher<User>(new OptionsWrapper<PasswordHasherOptions>(new PasswordHasherOptions())).HashPassword(adminUser, "123qwe");
            //    adminUser.IsEmailConfirmed = true;
            //    adminUser.IsActive = true;

            //    _context.Users.Add(adminUser);
            //    _context.SaveChanges();

            //    // Assign Admin role to admin user
            //    _context.UserRoles.Add(new UserRole(_tenantId, adminUser.Id, adminRole.Id));
            //    _context.SaveChanges();
            //}
        }
    }
}
