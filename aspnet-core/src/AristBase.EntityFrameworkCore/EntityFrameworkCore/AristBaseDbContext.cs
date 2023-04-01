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
        public DbSet<Department> Departments { get; set; }
        public DbSet<Certificate> Certificate { get; set; }
        public DbSet<CertificateKey> CertificateKey { get; set; }
        public DbSet<CertificateType> CertificateType { get; set; }
        public DbSet<ClientInfo> ClientInfo { get; set; }
        public DbSet<DocterGroup> DocterGroups { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<MedicalExaminationResult> MedicalExaminationResults { get; set; }
        //public DbSet<Tenant> Tenant { get; set; }
        public AristBaseDbContext(DbContextOptions<AristBaseDbContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CertificateKey>().HasIndex(p =>
            new
            {
                p.Key,
                p.CertificateTypeId
            }).IsUnique();
            //modelBuilder.Entity<ReportTemplate>().Property(r => r.TemplateDescription).HasColumnType("jsonb");
            //modelBuilder.Entity<HistoryExport>().Property(r => r.TemplateValue).HasColumnType("jsonb");
            //modelBuilder.Entity<ApplicationLanguageText>()
            //    .Property(p => p.Value)
            //    .HasMaxLength(100); // any integer that is smaller than 10485760
        }
    }
}
