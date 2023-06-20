using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class syncstatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SyncStatus",
                table: "CertificateSync",
                newName: "syncStatus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "syncStatus",
                table: "CertificateSync",
                newName: "SyncStatus");
        }
    }
}
