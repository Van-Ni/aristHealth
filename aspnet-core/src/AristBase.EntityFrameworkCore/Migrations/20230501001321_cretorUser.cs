using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class cretorUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryExports_AbpUsers_UserId",
                table: "HistoryExports");

            migrationBuilder.DropIndex(
                name: "IX_HistoryExports_UserId",
                table: "HistoryExports");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "HistoryExports");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryExports_CreatorUserId",
                table: "HistoryExports",
                column: "CreatorUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryExports_AbpUsers_CreatorUserId",
                table: "HistoryExports",
                column: "CreatorUserId",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryExports_AbpUsers_CreatorUserId",
                table: "HistoryExports");

            migrationBuilder.DropIndex(
                name: "IX_HistoryExports_CreatorUserId",
                table: "HistoryExports");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "HistoryExports",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_HistoryExports_UserId",
                table: "HistoryExports",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryExports_AbpUsers_UserId",
                table: "HistoryExports",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
