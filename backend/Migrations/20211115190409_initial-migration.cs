using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CapitanAmericaBackend.Migrations
{
    public partial class initialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Missions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    Place = table.Column<string>(type: "varchar(100)", nullable: false),
                    Description = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Missions", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Partners",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProvidedResources = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Birthday = table.Column<DateTime>(type: "datetime", nullable: false),
                    Home = table.Column<string>(type: "varchar(50)", nullable: true),
                    Nationality = table.Column<string>(type: "varchar(50)", nullable: true),
                    Death = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partners", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SavedPeople",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Birthday = table.Column<DateTime>(type: "datetime", nullable: false),
                    Home = table.Column<string>(type: "varchar(50)", nullable: true),
                    Nationality = table.Column<string>(type: "varchar(50)", nullable: true),
                    Death = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedPeople", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SuperPowers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Description = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuperPowers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Supers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    IsAlly = table.Column<bool>(type: "bit", nullable: false),
                    IsEnemy = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Birthday = table.Column<DateTime>(type: "datetime", nullable: false),
                    Home = table.Column<string>(type: "varchar(50)", nullable: true),
                    Nationality = table.Column<string>(type: "varchar(50)", nullable: true),
                    Death = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Teammates",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Team = table.Column<string>(type: "varchar(50)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Birthday = table.Column<DateTime>(type: "datetime", nullable: false),
                    Home = table.Column<string>(type: "varchar(50)", nullable: true),
                    Nationality = table.Column<string>(type: "varchar(50)", nullable: true),
                    Death = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teammates", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SaveOcassions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SavedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    SavedPlace = table.Column<string>(type: "varchar(50)", nullable: false),
                    SavedPeopleId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Missions");

            migrationBuilder.DropTable(
                name: "Partners");

            migrationBuilder.DropTable(
                name: "SaveOcassions");

            migrationBuilder.DropTable(
                name: "SuperSuperPower");

            migrationBuilder.DropTable(
                name: "Teammates");

            migrationBuilder.DropTable(
                name: "SavedPeople");

            migrationBuilder.DropTable(
                name: "SuperPowers");

            migrationBuilder.DropTable(
                name: "Supers");
        }
    }
}
