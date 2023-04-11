using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class rmvUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalExaminationResults_AbpUsers_UserId",
                table: "MedicalExaminationResults");

            migrationBuilder.DropIndex(
                name: "IX_MedicalExaminationResults_UserId",
                table: "MedicalExaminationResults");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MedicalExaminationResults");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "MedicalExaminationResults",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalExaminationResults_UserId",
                table: "MedicalExaminationResults",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalExaminationResults_AbpUsers_UserId",
                table: "MedicalExaminationResults",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
