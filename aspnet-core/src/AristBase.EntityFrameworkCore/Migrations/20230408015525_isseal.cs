using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class isseal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "ClientInfo");

            migrationBuilder.AddColumn<bool>(
                name: "IsSeal",
                table: "MedicalExaminationResults",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "ClientInfo",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSeal",
                table: "MedicalExaminationResults");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "ClientInfo");

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "ClientInfo",
                type: "text",
                nullable: true);
        }
    }
}
