using System;
using System.Collections.Generic;

namespace Api.Models
{
    public partial class ProductsOrders
    {
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public double ProductPrice { get; set; }
        public int Amount { get; set; }
        public int? ProductProductId { get; set; }

        public virtual Orders Order { get; set; }
        public virtual Products ProductProduct { get; set; }
    }
}
