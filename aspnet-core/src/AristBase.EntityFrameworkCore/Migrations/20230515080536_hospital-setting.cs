using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class hospitalsetting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HospitalSettings_AbpTenants_TenantId1",
                table: "HospitalSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HospitalSettings",
                table: "HospitalSettings");

            migrationBuilder.DropIndex(
                name: "IX_HospitalSettings_TenantId1",
                table: "HospitalSettings");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "HospitalSettings");

            migrationBuilder.RenameColumn(
                name: "TenantId1",
                table: "HospitalSettings",
                newName: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HospitalSettings",
                table: "HospitalSettings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HospitalSettings_AbpTenants_Id",
                table: "HospitalSettings",
                column: "Id",
                principalTable: "AbpTenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HospitalSettings_AbpTenants_Id",
                table: "HospitalSettings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HospitalSettings",
                table: "HospitalSettings");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "HospitalSettings",
                newName: "TenantId1");

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "HospitalSettings",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_HospitalSettings",
                table: "HospitalSettings",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_HospitalSettings_TenantId1",
                table: "HospitalSettings",
                column: "TenantId1");

            migrationBuilder.AddForeignKey(
                name: "FK_HospitalSettings_AbpTenants_TenantId1",
                table: "HospitalSettings",
                column: "TenantId1",
                principalTable: "AbpTenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
