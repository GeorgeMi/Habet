using Microsoft.AspNetCore.Http;

namespace Api.DTOs
{
    public class AddProductDTO
    {
        public string Name_RO { get; set; }
        public string Name_EN { get; set; }
        public string Name_IT { get; set; }
        public double Price { get; set; }
        public string Description_RO { get; set; }
        public string Description_EN { get; set; }
        public string Description_IT { get; set; }
        public IFormFile Image { get; set; }
    }
}