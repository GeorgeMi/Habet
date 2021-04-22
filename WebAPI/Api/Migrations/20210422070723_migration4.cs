using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class migration4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                schema: "dbo",
                table: "ProductsOrders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Lang",
                schema: "dbo",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                schema: "dbo",
                table: "ProductsOrders");

            migrationBuilder.DropColumn(
                name: "Lang",
                schema: "dbo",
                table: "Orders");
        }
    }
}
