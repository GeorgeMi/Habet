using System.Collections.Generic;

namespace Api.DTOs
{
    public class SearchDetails
    {
      public List<ProductInfo> Products { get; set; }
      public int TotalItemsCount { get; set; }
    }
}