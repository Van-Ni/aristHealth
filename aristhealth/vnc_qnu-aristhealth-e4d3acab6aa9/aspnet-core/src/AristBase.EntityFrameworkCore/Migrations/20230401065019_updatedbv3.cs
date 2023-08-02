using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class updatedbv3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatus_AbpUsers_UserId1",
                table: "CertificateGroupStatus");

            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatus_Certificate_CertificateId",
                table: "CertificateGroupStatus");

            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatus_Groups_GroupId",
                table: "CertificateGroupStatus");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CertificateGroupStatus",
                table: "CertificateGroupStatus");

            migrationBuilder.RenameTable(
                name: "CertificateGroupStatus",
                newName: "CertificateGroupStatuses");

            migrationBuilder.RenameIndex(
                name: "IX_CertificateGroupStatus_UserId1",
                table: "CertificateGroupStatuses",
                newName: "IX_CertificateGroupStatuses_UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_CertificateGroupStatus_GroupId",
                table: "CertificateGroupStatuses",
                newName: "IX_CertificateGroupStatuses_GroupId");

            migrationBuilder.RenameIndex(
                name: "IX_CertificateGroupStatus_CertificateId",
                table: "CertificateGroupStatuses",
                newName: "IX_CertificateGroupStatuses_CertificateId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CertificateGroupStatuses",
                table: "CertificateGroupStatuses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId1",
                table: "CertificateGroupStatuses",
                column: "UserId1",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatuses_Certificate_CertificateId",
                table: "CertificateGroupStatuses",
                column: "CertificateId",
                principalTable: "Certificate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatuses_Groups_GroupId",
                table: "CertificateGroupStatuses",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId1",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatuses_Certificate_CertificateId",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatuses_Groups_GroupId",
                table: "CertificateGroupStatuses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CertificateGroupStatuses",
                table: "CertificateGroupStatuses");

            migrationBuilder.RenameTable(
                name: "CertificateGroupStatuses",
                newName: "CertificateGroupStatus");

            migrationBuilder.RenameIndex(
                name: "IX_CertificateGroupStatuses_UserId1",
                table: "CertificateGroupStatus",
                newName: "IX_CertificateGroupStatus_UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_CertificateGroupStatuses_GroupId",
                table: "CertificateGroupStatus",
                newName: "IX_CertificateGroupStatus_GroupId");

            migrationBuilder.RenameIndex(
                name: "IX_CertificateGroupStatuses_CertificateId",
                table: "CertificateGroupStatus",
                newName: "IX_CertificateGroupStatus_CertificateId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CertificateGroupStatus",
                table: "CertificateGroupStatus",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatus_AbpUsers_UserId1",
                table: "CertificateGroupStatus",
                column: "UserId1",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatus_Certificate_CertificateId",
                table: "CertificateGroupStatus",
                column: "CertificateId",
                principalTable: "Certificate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatus_Groups_GroupId",
                table: "CertificateGroupStatus",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
