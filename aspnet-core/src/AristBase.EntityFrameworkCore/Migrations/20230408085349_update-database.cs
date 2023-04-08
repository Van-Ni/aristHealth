using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class updatedatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId1",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatuses_Groups_GroupId",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropTable(
                name: "CertificateKey");

            migrationBuilder.DropTable(
                name: "DocterGroups");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_CertificateGroupStatuses_GroupId",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropIndex(
                name: "IX_CertificateGroupStatuses_UserId1",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "CertificateGroupStatuses");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "CertificateGroupStatuses",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "CertificateGroupStatuses",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CertificateGroupStatuses_UserId",
                table: "CertificateGroupStatuses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId",
                table: "CertificateGroupStatuses",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropIndex(
                name: "IX_CertificateGroupStatuses_UserId",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropColumn(
                name: "Group",
                table: "CertificateGroupStatuses");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "CertificateGroupStatuses",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "CertificateGroupStatuses",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<long>(
                name: "UserId1",
                table: "CertificateGroupStatuses",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    TenantId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Groups_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CertificateKey",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CertificateTypeId = table.Column<int>(type: "integer", nullable: false),
                    GroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    Key = table.Column<string>(type: "text", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    TenantId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CertificateKey", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CertificateKey_CertificateType_CertificateTypeId",
                        column: x => x.CertificateTypeId,
                        principalTable: "CertificateType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CertificateKey_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocterGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId1 = table.Column<long>(type: "bigint", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    TenantId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocterGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocterGroups_AbpUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DocterGroups_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CertificateGroupStatuses_GroupId",
                table: "CertificateGroupStatuses",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_CertificateGroupStatuses_UserId1",
                table: "CertificateGroupStatuses",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_CertificateKey_CertificateTypeId",
                table: "CertificateKey",
                column: "CertificateTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CertificateKey_GroupId",
                table: "CertificateKey",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_CertificateKey_Key_CertificateTypeId",
                table: "CertificateKey",
                columns: new[] { "Key", "CertificateTypeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DocterGroups_GroupId",
                table: "DocterGroups",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_DocterGroups_UserId1",
                table: "DocterGroups",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_DepartmentId",
                table: "Groups",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId1",
                table: "CertificateGroupStatuses",
                column: "UserId1",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatuses_Groups_GroupId",
                table: "CertificateGroupStatuses",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
