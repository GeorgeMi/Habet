using System.Collections.Generic;

namespace Api.DTOs
{
    public class GetCartProductsDTO
    {
        public List<int> ProductIds { get; set; }
        public string Lang { get; set; }
    }
}