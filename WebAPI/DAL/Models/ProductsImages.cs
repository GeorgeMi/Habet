using System;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public partial class ProductsImages
    {
        public int ProductImageId { get; set; }
        public int ProductId { get; set; }
        public string Link { get; set; }

        public virtual Products Product { get; set; }
    }
}
