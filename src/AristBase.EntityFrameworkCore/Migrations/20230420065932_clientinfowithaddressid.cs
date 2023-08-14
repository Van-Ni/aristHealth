using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class clientinfowithaddressid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CommuneId",
                table: "ClientInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DistrictId",
                table: "ClientInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProvinceId",
                table: "ClientInfo",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommuneId",
                table: "ClientInfo");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "ClientInfo");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "ClientInfo");
        }
    }
}
