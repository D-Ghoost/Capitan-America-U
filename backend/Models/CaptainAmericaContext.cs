using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CapitanAmericaBackend.Utils;

namespace CapitanAmericaBackend.models
{
    public class CaptainAmericaContext : DbContext
    {
        public CaptainAmericaContext()
        {
        }

        public CaptainAmericaContext(DbContextOptions<CaptainAmericaContext> options) : base(options) 
        {
        }

        public DbSet<Mission> Misions { get; set; }
        public DbSet<Partner> Partners { get; set; }
        public DbSet<SavedPeople> SavedPeople { get; set; }
        public DbSet<Super> Supers { get; set; }
        public DbSet<Teammate> Teammates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Mission>(entity =>
            {
                entity.ToTable("Missions");
                
                ConfigureBase(entity);

                entity.Property(mision => mision.MissionDate)
                    .HasColumnName("Date")
                    .HasColumnType(SqlUtils.DateTimeType)
                    .IsRequired();

                entity.Property(mision => mision.Place)
                    .HasColumnName("Place")
                    .HasColumnType($"{SqlUtils.VarcharType}(100)")
                    .IsRequired();

                entity.Property(mision => mision.Description)
                    .HasColumnName("Description")
                    .HasColumnType($"{SqlUtils.VarcharType}(MAX)")
                    .IsRequired();
            });

            modelBuilder.Entity<Partner>(entity =>
            {
                entity.ToTable("Partners");
                
                ConfigureBaseEntity(entity);

                entity.Property(partner => partner.ProvidedResources)
                    .HasColumnName("ProvidedResources")
                    .HasColumnType(SqlUtils.BigIntType)
                    .IsRequired();
            });

            modelBuilder.Entity<SavedPeople>(entity =>
            {
                entity.ToTable("SavedPeople");
                
                ConfigureBaseEntity(entity);
            });

            modelBuilder.Entity<Super>(entity =>
            {
                entity.ToTable("Supers");
                
                ConfigureBaseEntity(entity);

                entity.Property(super => super.Description)
                    .HasColumnName("Description")
                    .HasColumnType($"{SqlUtils.VarcharType}(MAX)")
                    .IsRequired();

                entity.Property(super => super.IsAlly)
                    .HasColumnName("IsAlly")
                    .HasColumnType(SqlUtils.BitType)
                    .IsRequired();
                
                entity.Property(super => super.IsEnemy)
                    .HasColumnName("IsEnemy")
                    .HasColumnType(SqlUtils.BitType)
                    .IsRequired();
            });

            modelBuilder.Entity<Teammate>(entity =>
            {
                entity.ToTable("Teammates");
                
                ConfigureBaseEntity(entity);

                entity.Property(teammate => teammate.Team)
                    .HasColumnName("Team")
                    .HasColumnType($"{SqlUtils.VarcharType}(50)")
                    .IsRequired();
            });
        }

        private static void ConfigureBase<T>(EntityTypeBuilder<T> entity) where T : Base
        {
            entity.Property(t => t.Id)
                .HasColumnName("ID")
                .UseIdentityColumn();

            entity.Property(t => t.CreatedAt)
                .HasColumnName("CreatedAt")
                .HasColumnType(SqlUtils.DateTimeType)
                .HasDefaultValueSql("(getdate())")
                .IsRequired();
                
            entity.Property(t => t.UpdatedAt)
                .HasColumnName("UpdatedAt")
                .HasColumnType(SqlUtils.DateTimeType)
                .HasDefaultValueSql("(getdate())")
                .IsRequired();
        }

        private static void ConfigureBaseEntity<T>(EntityTypeBuilder<T> entity) where T : BaseEntity
        {
            ConfigureBase(entity);

            entity.Property(t => t.Name)
                .HasColumnName("Name")
                .HasColumnType($"{SqlUtils.VarcharType}(50)")
                .IsRequired();

            entity.Property(t => t.Home)
                .HasColumnName("Home")
                .HasColumnType($"{SqlUtils.VarcharType}(50)");

            entity.Property(t => t.Nationality)
                .HasColumnName("Nationality")
                .HasColumnType($"{SqlUtils.VarcharType}(50)");
        }
    }
}