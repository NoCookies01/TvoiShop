using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Configuration;
using System.Threading.Tasks;
using TvoiShop.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.Extensions.Options;

#nullable disable

namespace TvoiShop.Infrastructure
{
    public partial class TvoiShopDBContext : ApiAuthorizationDbContext<ApplicationUser>
    {

        public TvoiShopDBContext(DbContextOptions<TvoiShopDBContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
        }

        public virtual DbSet<Product> Products { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");
            
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Products");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
