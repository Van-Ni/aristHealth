using Microsoft.EntityFrameworkCore.Migrations;
using NpgsqlTypes;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class rmfts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClientInfo_SearchVector",
                table: "ClientInfo");

            migrationBuilder.DropColumn(
                name: "SearchVector",
                table: "ClientInfo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<NpgsqlTsVector>(
                name: "SearchVector",
                table: "ClientInfo",
                type: "tsvector",
                nullable: true)
                .Annotation("Npgsql:TsVectorConfig", "english")
                .Annotation("Npgsql:TsVectorProperties", new[] { "FullName" });

            migrationBuilder.CreateIndex(
                name: "IX_ClientInfo_SearchVector",
                table: "ClientInfo",
                column: "SearchVector")
                .Annotation("Npgsql:IndexMethod", "GIN");
        }
    }
}
