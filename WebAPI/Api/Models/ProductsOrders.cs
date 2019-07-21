using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api
{
    public partial class ProductsOrders
    {
        [Key]
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public double ProductPrice { get; set; }
        public int Amount { get; set; }

        public virtual Orders Order { get; set; }
        public virtual Products Product { get; set; }
    }
}
