using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.MultiTenancy;
using AristBase.Authorization;
using AristBase.Authorization.Roles;
using System.Collections.Generic;

namespace AristBase.EntityFrameworkCore.Seed.Tenants
{
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
            CustomRole();

            
        }
        private void CustomRole()
        {
            var roleForHost = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == _tenantId && r.Name == "In");
            if (roleForHost == null)
            {
                roleForHost = _context.Roles.Add(new Role(_tenantId, "In", "In") { IsStatic = true, IsDefault = true }).Entity;
                _context.SaveChanges();
            }
            var grantedPermissions = _context.Permissions.IgnoreQueryFilters()
            .OfType<RolePermissionSetting>()
            .Where(p => p.TenantId == _tenantId && p.RoleId == roleForHost.Id)
            .Select(p => p.Name)
            .ToList();
            var allPermission = new List<string>
                {
                    PermissionNames.PageReadIn
                };
            var permissions = PermissionFinder
                .GetAllPermissions(new AristBaseAuthorizationProvider())
                .Where(p => p.MultiTenancySides.HasFlag(MultiTenancySides.Tenant) &&
                            !grantedPermissions.Contains(p.Name))
                .Where(p => allPermission.Contains(p.Name))
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
    }
}
