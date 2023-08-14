using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class clientinfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Certificate_ClientInfo_ClientInfoId",
                table: "Certificate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClientInfo",
                table: "ClientInfo");

            migrationBuilder.DropIndex(
                name: "IX_Certificate_ClientInfoId",
                table: "Certificate");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ClientInfo",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "Year",
                table: "ClientInfo",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ClientInfoYear",
                table: "Certificate",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClientInfo",
                table: "ClientInfo",
                columns: new[] { "Id", "Year" });

            migrationBuilder.CreateIndex(
                name: "IX_Certificate_ClientInfoId_ClientInfoYear",
                table: "Certificate",
                columns: new[] { "ClientInfoId", "ClientInfoYear" });

            migrationBuilder.AddForeignKey(
                name: "FK_Certificate_ClientInfo_ClientInfoId_ClientInfoYear",
                table: "Certificate",
                columns: new[] { "ClientInfoId", "ClientInfoYear" },
                principalTable: "ClientInfo",
                principalColumns: new[] { "Id", "Year" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Certificate_ClientInfo_ClientInfoId_ClientInfoYear",
                table: "Certificate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClientInfo",
                table: "ClientInfo");

            migrationBuilder.DropIndex(
                name: "IX_Certificate_ClientInfoId_ClientInfoYear",
                table: "Certificate");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "ClientInfo");

            migrationBuilder.DropColumn(
                name: "ClientInfoYear",
                table: "Certificate");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ClientInfo",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClientInfo",
                table: "ClientInfo",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Certificate_ClientInfoId",
                table: "Certificate",
                column: "ClientInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Certificate_ClientInfo_ClientInfoId",
                table: "Certificate",
                column: "ClientInfoId",
                principalTable: "ClientInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
