using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class ApiContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public ApiContext() : base("name=ApiContext")
        {
        }

        public System.Data.Entity.DbSet<Api.Orders> Orders { get; set; }

        public System.Data.Entity.DbSet<Api.Users> Users { get; set; }

        public System.Data.Entity.DbSet<Api.Products> Products { get; set; }

        public System.Data.Entity.DbSet<Api.ProductsImages> ProductsImages { get; set; }
    }
}
