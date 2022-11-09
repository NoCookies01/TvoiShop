using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TvoiShop.Infrastructure.Migrations
{
    public partial class add_count_and_custom_popularity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "CustomPopularity",
                table: "Products",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CustomPopularity",
                table: "Products");
        }
    }
}
