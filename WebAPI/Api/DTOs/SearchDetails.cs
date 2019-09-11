using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.DTOs
{
    public class SearchDetails
    {
      public List<ProductInfo> Products { get; set; }
      public int TotalItemsCount { get; set; }
    }
}