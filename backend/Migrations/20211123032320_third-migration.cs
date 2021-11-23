using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CapitanAmericaBackend.Migrations
{
    public partial class thirdmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "Teammates");

            migrationBuilder.DropColumn(
                name: "Death",
                table: "Teammates");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "Supers");

            migrationBuilder.DropColumn(
                name: "Death",
                table: "Supers");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "SavedPeople");

            migrationBuilder.DropColumn(
                name: "Death",
                table: "SavedPeople");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "Death",
                table: "Partners");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Birthday",
                table: "Teammates",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Death",
                table: "Teammates",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Birthday",
                table: "Supers",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Death",
                table: "Supers",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Birthday",
                table: "SavedPeople",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Death",
                table: "SavedPeople",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Birthday",
                table: "Partners",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Death",
                table: "Partners",
                type: "datetime",
                nullable: true);
        }
    }
}
