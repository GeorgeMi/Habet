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
        public string Name_RO { get; set; }
        public string Name_EN { get; set; }
        public string Name_IT { get; set; }
        public double Price { get; set; }
        public string Description_RO { get; set; }
        public string Description_EN { get; set; }
        public string Description_IT { get; set; }
        public string Gender { get; set; }
        public string Type { get; set; }
        public string StyleCode { get; set; }
        public string LeatherType { get; set; }
        public string Colour { get; set; }
 
        public virtual ICollection<ProductsOrders> ProductsOrders { get; set; }
    }
}
