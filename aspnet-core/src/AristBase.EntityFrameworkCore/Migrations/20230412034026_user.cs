using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class user : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "AbpUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Prefix",
                table: "AbpUsers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Prefix",
                table: "AbpUsers");
        }
    }
}
