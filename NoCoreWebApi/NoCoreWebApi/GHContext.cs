using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

public class GHContext : DbContext
{
    // You can add custom code to this file. Changes will not be overwritten.
    // 
    // If you want Entity Framework to drop and regenerate your database
    // automatically whenever you change your model schema, please use data migrations.
    // For more information refer to the documentation:
    // http://msdn.microsoft.com/en-us/data/jj591621.aspx

    public GHContext() : base("name=GHContext")
    {
    }

    public System.Data.Entity.DbSet<NoCoreWebApi.Models.Orders> Orders { get; set; }

    public System.Data.Entity.DbSet<NoCoreWebApi.Models.Users> Users { get; set; }

    public System.Data.Entity.DbSet<NoCoreWebApi.Models.Products> Products { get; set; }

    public System.Data.Entity.DbSet<NoCoreWebApi.Models.ProductsImages> ProductsImages { get; set; }

    public System.Data.Entity.DbSet<NoCoreWebApi.Models.ProductsOrders> ProductsOrders { get; set; }

    public System.Data.Entity.DbSet<NoCoreWebApi.Models.Roles> Roles { get; set; }

    public System.Data.Entity.DbSet<NoCoreWebApi.Models.UsersAddresses> UsersAddresses { get; set; }
}
