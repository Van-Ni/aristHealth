using System;
using AristBase.BaseEntity.XML;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class syncres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Regions");

            migrationBuilder.AddColumn<SyncResponse>(
                name: "SyncResponse",
                table: "CertificateSync",
                type: "jsonb",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "HospitalSettings",
                columns: table => new
                {
                    TenantId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TenantId1 = table.Column<int>(type: "integer", nullable: false),
                    IdHospital = table.Column<string>(type: "text", nullable: true),
                    HospitalBranchName = table.Column<string>(type: "text", nullable: true),
                    HospitalBaseDepartment = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    PasswordMD5 = table.Column<string>(type: "text", nullable: true),
                    NormalTile = table.Column<string>(type: "text", nullable: true),
                    DriverLicenseTile = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalSettings", x => x.TenantId);
                    table.ForeignKey(
                        name: "FK_HospitalSettings_AbpTenants_TenantId1",
                        column: x => x.TenantId1,
                        principalTable: "AbpTenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HospitalSettings_TenantId1",
                table: "HospitalSettings",
                column: "TenantId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HospitalSettings");

            migrationBuilder.DropColumn(
                name: "SyncResponse",
                table: "CertificateSync");

            migrationBuilder.CreateTable(
                name: "Regions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ParentId = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Regions_Regions_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Regions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Regions_ParentId",
                table: "Regions",
                column: "ParentId");
        }
    }
}
