using System;
using System.Transactions;
using Microsoft.EntityFrameworkCore;
using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.EntityFrameworkCore.Uow;
using Abp.MultiTenancy;
using AristBase.EntityFrameworkCore.Seed.Host;
using AristBase.EntityFrameworkCore.Seed.Tenants;
using System.Collections.Generic;
using AristBase.EntityFrameworkCore.Seed.Tenants.Base;
using System.Linq;

namespace AristBase.EntityFrameworkCore.Seed
{
    public class Tenancy
    {
        public string TernancyName { get; set; }
        public string Name { get; set; }
    }
    public static class SeedHelper
    {
        public static List<Tenancy> Tenancies = new List<Tenancy>()
        {
            new Tenancy()
            {
                TernancyName = "ttgdyk",
                Name = "Trung tâm giám định y khoa"
            },
        };
        public static void SeedHostDb(IIocResolver iocResolver)
        {
            WithDbContext<AristBaseDbContext>(iocResolver, SeedHostDb);           
        }

        public static void GetAndSeedTenantDb(IIocResolver iocResolver)
        {
            WithIocDbContext<AristBaseDbContext>(iocResolver, SeedAllTernantDb);            
        }
        private static void SeedAllTernantDb(AristBaseDbContext context, IIocResolver iocResolver)
        {
            context.SuppressAutoSetTenantId = true;
            var tenants = context.Tenants.Where(t=>!string.IsNullOrEmpty(t.ConnectionString)).ToList();
            foreach (var tenant in tenants)
            {
                WithTenantDbContext<AristBaseDbContext>(iocResolver, tenant.Id, SeedTenantDb);
            }
        }
        public static void SeedHostDb(AristBaseDbContext context)
        {          
            context.SuppressAutoSetTenantId = true;

            // Host seed
            new InitialHostDbBuilder(context).Create();

            // Default tenant seed (in host database).
            new DefaultTenantBuilder(context).Create();            
            new TenantRoleAndUserBuilder(context, 1).Create();
            foreach (var tn in Tenancies)
            {
                var newTn = new DefaultTenant(context, tn.TernancyName, tn.Name).Create();
                new TenantRoleAndUserBuilder(context, newTn).Create();
                new TenantRoleBuilder(context, newTn).Create();
                new DefaultCerfiticateTypeCreator(context, newTn).Create();
            }            
        }

        public static void SeedTenantDb(AristBaseDbContext context, int newTn)
        {
            new TenantRoleAndUserBuilder(context, newTn).Create();
            new TenantRoleBuilder(context, newTn).Create();
            //new DefaultCerfiticateTypeCreator(context, newTn).Create();
        }
        private static void WithDbContext<TDbContext>(IIocResolver iocResolver, Action<TDbContext> contextAction)
            where TDbContext : DbContext
        {
            using (var uowManager = iocResolver.ResolveAsDisposable<IUnitOfWorkManager>())
            {
                using (var uow = uowManager.Object.Begin(TransactionScopeOption.Suppress))
                {
                    var context = uowManager.Object.Current.GetDbContext<TDbContext>(MultiTenancySides.Host);

                    contextAction(context);

                    uow.Complete();
                }
            }
        }
        private static void WithTenantDbContext<TDbContext>(IIocResolver iocResolver, int tenantid, Action<TDbContext, int> contextAction)
            where TDbContext : DbContext
        {
            using (var uowManager = iocResolver.ResolveAsDisposable<IUnitOfWorkManager>())
            {
                uowManager.Object.Current.SetTenantId(tenantid);
                using (var uow = uowManager.Object.Begin(TransactionScopeOption.Suppress))
                {
                    var context = uowManager.Object.Current.GetDbContext<TDbContext>(MultiTenancySides.Tenant);

                    contextAction(context, tenantid);

                    uow.Complete();
                }
            }
        }
        private static void WithIocDbContext<TDbContext>(IIocResolver iocResolver, Action<TDbContext, IIocResolver> contextAction)
            where TDbContext : DbContext
        {
            using (var uowManager = iocResolver.ResolveAsDisposable<IUnitOfWorkManager>())
            {
                using (var uow = uowManager.Object.Begin(TransactionScopeOption.Suppress))
                {
                    var context = uowManager.Object.Current.GetDbContext<TDbContext>(MultiTenancySides.Host);

                    contextAction(context, iocResolver);

                    uow.Complete();
                }
            }
        }
    }
}
