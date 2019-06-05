using System;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public partial class Products
    {
        public Products()
        {
            ProductsImages = new HashSet<ProductsImages>();
            ProductsOrders = new HashSet<ProductsOrders>();
        }

        public int ProductId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }

        public virtual ICollection<ProductsImages> ProductsImages { get; set; }
        public virtual ICollection<ProductsOrders> ProductsOrders { get; set; }
    }
}
