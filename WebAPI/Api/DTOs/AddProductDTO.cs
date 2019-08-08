using Api.Models;
using Microsoft.AspNetCore.Http;

namespace Api.DTOs
{
    public class AddProductDTO
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
    }
}