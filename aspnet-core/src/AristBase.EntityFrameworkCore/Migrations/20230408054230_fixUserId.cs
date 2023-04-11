using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class fixUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalExaminationResults_AbpUsers_UserId1",
                table: "MedicalExaminationResults");

            migrationBuilder.DropIndex(
                name: "IX_MedicalExaminationResults_UserId1",
                table: "MedicalExaminationResults");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "MedicalExaminationResults");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "MedicalExaminationResults",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalExaminationResults_AbpUsers_UserId",
                table: "MedicalExaminationResults");

            migrationBuilder.DropIndex(
                name: "IX_MedicalExaminationResults_UserId",
                table: "MedicalExaminationResults");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "MedicalExaminationResults",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "UserId1",
                table: "MedicalExaminationResults",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalExaminationResults_UserId1",
                table: "MedicalExaminationResults",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalExaminationResults_AbpUsers_UserId1",
                table: "MedicalExaminationResults",
                column: "UserId1",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }
    }
}
