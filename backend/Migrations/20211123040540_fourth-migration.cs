using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CapitanAmericaBackend.Migrations
{
    public partial class fourthmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SaveOcassions");

            migrationBuilder.DropTable(
                name: "SuperSuperPower");

            migrationBuilder.DropTable(
                name: "SuperPowers");

            migrationBuilder.AddColumn<DateTime>(
                name: "SavedDate",
                table: "SavedPeople",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "SavedPlace",
                table: "SavedPeople",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SavedDate",
                table: "SavedPeople");

            migrationBuilder.DropColumn(
                name: "SavedPlace",
                table: "SavedPeople");

            migrationBuilder.CreateTable(
                name: "SaveOcassions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    SavedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    SavedPeopleId = table.Column<int>(type: "int", nullable: true),
                    SavedPlace = table.Column<string>(type: "varchar(50)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaveOcassions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SaveOcassions_SavedPeople_SavedPeopleId",
                        column: x => x.SavedPeopleId,
                        principalTable: "SavedPeople",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SuperPowers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    Description = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuperPowers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SuperSuperPower",
                columns: table => new
                {
                    SuperpowersId = table.Column<int>(type: "int", nullable: false),
                    SupersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuperSuperPower", x => new { x.SuperpowersId, x.SupersId });
                    table.ForeignKey(
                        name: "FK_SuperSuperPower_SuperPowers_SuperpowersId",
                        column: x => x.SuperpowersId,
                        principalTable: "SuperPowers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SuperSuperPower_Supers_SupersId",
                        column: x => x.SupersId,
                        principalTable: "Supers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SaveOcassions_SavedPeopleId",
                table: "SaveOcassions",
                column: "SavedPeopleId");

            migrationBuilder.CreateIndex(
                name: "IX_SuperSuperPower_SupersId",
                table: "SuperSuperPower",
                column: "SupersId");
        }
    }
}
