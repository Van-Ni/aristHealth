﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AristBase.Migrations
{
    /// <inheritdoc />
    public partial class certype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TypeName",
                table: "CertificateType",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeName",
                table: "CertificateType");
        }
    }
}
