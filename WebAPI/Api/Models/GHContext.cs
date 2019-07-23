using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
    public partial class GHContext : DbContext
    {
        public GHContext()
        {
        }

        public GHContext(DbContextOptions<GHContext> options)
            : base(options)
        {
        }

        public virtual DbSet<MigrationHistory> MigrationHistory { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<ProductsImages> ProductsImages { get; set; }
        public virtual DbSet<ProductsOrders> ProductsOrders { get; set; }
        public virtual DbSet<Tokens> Tokens { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<UsersAddresses> UsersAddresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=188.121.44.217;Database=GH;user id=Gabriel;pwd=Habetpassword123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:DefaultSchema", "Gabriel");

            modelBuilder.Entity<MigrationHistory>(entity =>
            {
                entity.HasKey(e => new { e.MigrationId, e.ContextKey })
                    .HasName("PK_dbo.__MigrationHistory");

                entity.ToTable("__MigrationHistory", "dbo");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ContextKey).HasMaxLength(300);

                entity.Property(e => e.Model).IsRequired();

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(e => e.OrderId)
                    .HasName("PK_dbo.Orders");

                entity.ToTable("Orders", "dbo");

                entity.HasIndex(e => e.UserId)
                    .HasName("IX_UserId");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_dbo.Orders_dbo.Users_UserId");
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("PK_dbo.Products");

                entity.ToTable("Products", "dbo");
            });

            modelBuilder.Entity<ProductsImages>(entity =>
            {
                entity.ToTable("ProductsImages", "dbo");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<ProductsOrders>(entity =>
            {
                entity.HasKey(e => e.ProductId)
                    .HasName("PK_dbo.ProductsOrders");

                entity.ToTable("ProductsOrders", "dbo");

                entity.HasIndex(e => e.OrderId)
                    .HasName("IX_OrderId");

                entity.HasIndex(e => e.ProductProductId)
                    .HasName("IX_Product_ProductId");

                entity.Property(e => e.ProductProductId).HasColumnName("Product_ProductId");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.ProductsOrders)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_dbo.ProductsOrders_dbo.Orders_OrderId");

                entity.HasOne(d => d.ProductProduct)
                    .WithMany(p => p.ProductsOrders)
                    .HasForeignKey(d => d.ProductProductId)
                    .HasConstraintName("FK_dbo.ProductsOrders_dbo.Products_Product_ProductId");
            });

            modelBuilder.Entity<Tokens>(entity =>
            {
                entity.HasKey(e => e.TokenId)
                    .HasName("PK_dbo.Tokens");

                entity.ToTable("Tokens", "dbo");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ExpirationDate).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Tokens)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo.Tokens_dbo.Users_UserId");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_dbo.Users");

                entity.ToTable("Users", "dbo");

                entity.Property(e => e.Role).HasMaxLength(50);

                entity.Property(e => e.Verified).HasMaxLength(50);
            });

            modelBuilder.Entity<UsersAddresses>(entity =>
            {
                entity.HasKey(e => e.UserAdressId)
                    .HasName("PK_dbo.UsersAddresses");

                entity.ToTable("UsersAddresses", "dbo");

                entity.HasIndex(e => e.UserId)
                    .HasName("IX_UserId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersAddresses)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_dbo.UsersAddresses_dbo.Users_UserId");
            });
        }
    }
}
