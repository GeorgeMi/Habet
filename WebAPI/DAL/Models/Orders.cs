using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public partial class Orders
    {
        public Orders()
        {
            ProductsOrders = new HashSet<ProductsOrders>();
        }

        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<ProductsOrders> ProductsOrders { get; set; }
    }
}
