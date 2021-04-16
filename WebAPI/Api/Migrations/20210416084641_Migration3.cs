using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class Migration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dbo.ProductsOrders_dbo.Products_Product_ProductId",
                schema: "dbo",
                table: "ProductsOrders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductsOrders",
                schema: "dbo",
                table: "ProductsOrders");

            migrationBuilder.DropColumn(
                name: "ProductId",
                schema: "dbo",
                table: "ProductsOrders");

            migrationBuilder.RenameIndex(
                name: "IX_Product_ProductId",
                schema: "dbo",
                table: "ProductsOrders",
                newName: "IX_ProductId");

            migrationBuilder.AlterColumn<int>(
                name: "Product_ProductId",
                schema: "dbo",
                table: "ProductsOrders",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_dbo.ProductsOrders",
                schema: "dbo",
                table: "ProductsOrders",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_dbo.ProductsOrders_dbo.Products_ProductId",
                schema: "dbo",
                table: "ProductsOrders",
                column: "Product_ProductId",
                principalSchema: "dbo",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dbo.ProductsOrders_dbo.Products_ProductId",
                schema: "dbo",
                table: "ProductsOrders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dbo.ProductsOrders",
                schema: "dbo",
                table: "ProductsOrders");

            migrationBuilder.RenameIndex(
                name: "IX_ProductId",
                schema: "dbo",
                table: "ProductsOrders",
                newName: "IX_Product_ProductId");

            migrationBuilder.AlterColumn<int>(
                name: "Product_ProductId",
                schema: "dbo",
                table: "ProductsOrders",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                schema: "dbo",
                table: "ProductsOrders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductsOrders",
                schema: "dbo",
                table: "ProductsOrders",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_dbo.ProductsOrders_dbo.Products_Product_ProductId",
                schema: "dbo",
                table: "ProductsOrders",
                column: "Product_ProductId",
                principalSchema: "dbo",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
