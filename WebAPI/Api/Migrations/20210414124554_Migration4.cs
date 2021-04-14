using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class Migration4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                schema: "dbo",
                table: "Products",
                newName: "Price_RON");

            migrationBuilder.AddColumn<double>(
                name: "Price_EUR",
                schema: "dbo",
                table: "Products",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Price_GBP",
                schema: "dbo",
                table: "Products",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price_EUR",
                schema: "dbo",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Price_GBP",
                schema: "dbo",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Price_RON",
                schema: "dbo",
                table: "Products",
                newName: "Price");
        }
    }
}
