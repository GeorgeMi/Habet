using System;
using System.Collections.Generic;

namespace Api.Models
{
    public partial class Products
    {
        public Products()
        {
            ProductsOrders = new HashSet<ProductsOrders>();
        }

        public int ProductId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string Gender { get; set; }
        public string Type { get; set; }

        public virtual ICollection<ProductsOrders> ProductsOrders { get; set; }
    }
}
