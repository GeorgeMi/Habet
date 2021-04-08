using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class MyFirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Currency",
                schema: "dbo",
                table: "ProductsOrders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Colour",
                schema: "dbo",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LeatherType",
                schema: "dbo",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StyleCode",
                schema: "dbo",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Invoice",
                schema: "dbo",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "MailSent",
                schema: "dbo",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Sent",
                schema: "dbo",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransactionId",
                schema: "dbo",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                schema: "dbo",
                table: "ProductsOrders");

            migrationBuilder.DropColumn(
                name: "Colour",
                schema: "dbo",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "LeatherType",
                schema: "dbo",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "StyleCode",
                schema: "dbo",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Invoice",
                schema: "dbo",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "MailSent",
                schema: "dbo",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Sent",
                schema: "dbo",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                schema: "dbo",
                table: "Orders");
        }
    }
}
