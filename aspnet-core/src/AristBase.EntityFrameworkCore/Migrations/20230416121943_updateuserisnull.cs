using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class updateuserisnull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId",
                table: "CertificateGroupStatuses");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "CertificateGroupStatuses",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId",
                table: "CertificateGroupStatuses",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId",
                table: "CertificateGroupStatuses");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "CertificateGroupStatuses",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CertificateGroupStatuses_AbpUsers_UserId",
                table: "CertificateGroupStatuses",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
