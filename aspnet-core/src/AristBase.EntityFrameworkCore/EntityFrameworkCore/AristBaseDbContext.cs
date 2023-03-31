using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AristBase.Authorization.Roles;
using AristBase.Authorization.Users;
using AristBase.MultiTenancy;
using Abp.Localization;
using AristBase.BaseEntity;
using AristBase.Authorization;

namespace AristBase.EntityFrameworkCore
{
    public class AristBaseDbContext : AbpZeroDbContext<Tenant, Role, User, AristBaseDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<ReportTemplate> ReportTemplates { get; set; }
        public DbSet<HistoryExport> HistoryExports { get; set; }
        public DbSet<Enterprise> Enterprises { get; set; }
        public DbSet<EnterpriseRevenue> EnterpriseRevenues { get; set; }
        public DbSet<PropertyType> PropertyTypes { get; set; }
        public DbSet<LetterInformation> LetterInformation { get; set; }
        public DbSet<EnterprisePropertyByTime> EnterprisePropertyByTimes { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<EnterpriseDepartment> EnterpriseDepartments { get; set; }
        public DbSet<PropertyTypeValue> PropertyTypeValues { get; set; }
        public DbSet<EnterpriseTax> EnterpriseTaxes { get; set; }
        public AristBaseDbContext(DbContextOptions<AristBaseDbContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ReportTemplate>().Property(r => r.TemplateDescription).HasColumnType("jsonb");
            modelBuilder.Entity<HistoryExport>().Property(r => r.TemplateValue).HasColumnType("jsonb");
            modelBuilder.Entity<ApplicationLanguageText>()
                .Property(p => p.Value)
                .HasMaxLength(100); // any integer that is smaller than 10485760
        }
    }
}
