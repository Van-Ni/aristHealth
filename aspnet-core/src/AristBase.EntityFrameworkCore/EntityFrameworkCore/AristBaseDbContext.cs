using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AristBase.Authorization.Roles;
using AristBase.Authorization.Users;
using AristBase.MultiTenancy;
using Abp.Localization;
using AristBase.BaseEntity;
using AristBase.Authorization;
using Abp.Timing;

namespace AristBase.EntityFrameworkCore
{
    public class AristBaseDbContext : AbpZeroDbContext<Tenant, Role, User, AristBaseDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Certificate> Certificate { get; set; }
        public DbSet<CertificateType> CertificateType { get; set; }
        public DbSet<CertificateSync> CertificateSync { get; set; }

        public DbSet<ClientInfo> ClientInfo { get; set; }

        public DbSet<CertificateGroupStatus> CertificateGroupStatuses { get; set; }
        public DbSet<Region> Regions { get; set; }

        public AristBaseDbContext(DbContextOptions<AristBaseDbContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<MedicationKeyResult>().HasIndex(p =>
            //new
            //{
            //    p.Key,
            //    p.CertificateId
            //}).IsUnique();

            //modelBuilder.Entity<MedicationKeyResult>().HasIndex(p => p.CertificateId);
            modelBuilder.Entity<CertificateGroupStatus>().Property(r => r.Content).HasColumnType("jsonb");
            modelBuilder.Entity<CertificateSync>().Property(r => r.MetaData).HasColumnType("jsonb");
            modelBuilder.Entity<CertificateType>().Property(r => r.TemplateGroups).HasColumnType("jsonb");
            modelBuilder.Entity<ClientInfo>().HasKey(r =>
            new {
                r.Id,
                r.Year
            });
            modelBuilder.Entity<ClientInfo>().Property(c => c.Id).UseIdentityAlwaysColumn();
            modelBuilder.Entity<Region>().HasMany(r => r.ChildRegions).WithOne(cr => cr.ParentRegion).HasForeignKey(r => r.ParentId);


        }
    }
}
