using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TvoiShop.Infrastructure.Migrations
{
    public partial class Packaging : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Packaging",
                table: "Products",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Packaging",
                table: "Products");
        }
    }
}
