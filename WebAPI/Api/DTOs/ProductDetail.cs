using System.Collections.Generic;

namespace Api.DTOs
{
    public class ProductDetail
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public List<string> Image { get; set; }
        public string Description { get; set; }
        public string StyleCode { get; set; }
        public string LeatherType { get; set; }
        public string Colour { get; set; }
    }
}