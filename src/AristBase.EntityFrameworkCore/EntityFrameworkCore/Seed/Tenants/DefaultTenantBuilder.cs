using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.MultiTenancy;
using AristBase.Editions;
using AristBase.MultiTenancy;

namespace AristBase.EntityFrameworkCore.Seed.Tenants
{
    public class DefaultTenantBuilder
    {
        private readonly AristBaseDbContext _context;

        public DefaultTenantBuilder(AristBaseDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateDefaultTenant();
        }

        private void CreateDefaultTenant()
        {
            // Default tenant

            var defaultTenant = _context.Tenants.IgnoreQueryFilters().FirstOrDefault(t => t.TenancyName == AbpTenantBase.DefaultTenantName);
            if (defaultTenant == null)
            {
                defaultTenant = new Tenant(AbpTenantBase.DefaultTenantName, AbpTenantBase.DefaultTenantName);

                var defaultEdition = _context.Editions.IgnoreQueryFilters().FirstOrDefault(e => e.Name == EditionManager.DefaultEditionName);
                if (defaultEdition != null)
                {
                    defaultTenant.EditionId = defaultEdition.Id;
                }

                _context.Tenants.Add(defaultTenant);
                _context.SaveChanges();
            }
        }
    }
    public class DefaultTenant
    {
        private readonly AristBaseDbContext _context;
        private readonly string _tenancyName;
        private readonly string _name;

        public DefaultTenant(AristBaseDbContext context, string tenancyName, string name)
        {
            _context = context;
            this._tenancyName = tenancyName;
            this._name = name;
        }

        public int Create()
        {
            return CreateDefaultTenant();
        }

        private int CreateDefaultTenant()
        {
            var defaultTenant = _context.Tenants.IgnoreQueryFilters().FirstOrDefault(t => t.TenancyName == _tenancyName);
            if (defaultTenant == null)
            {
                defaultTenant = new Tenant(_tenancyName, _name);

                var defaultEdition = _context.Editions.IgnoreQueryFilters().FirstOrDefault(e => e.Name == EditionManager.DefaultEditionName);
                if (defaultEdition != null)
                {
                    defaultTenant.EditionId = defaultEdition.Id;
                }

                _context.Tenants.Add(defaultTenant);
                _context.SaveChanges();
            }
            return defaultTenant.Id;
        }
    }
}
