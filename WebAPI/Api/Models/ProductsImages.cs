using System;

namespace Api.Models
{
    public partial class ProductsImages
    {
        public Guid Id { get; set; }
        public int ProductId { get; set; }
        public byte[] Name { get; set; }
        public byte[] Data { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string ContentType { get; set; }
        public DateTime Date { get; set; }
    }
}
