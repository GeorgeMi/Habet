
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace NoCoreWebApi.DTOs
{
    public class ProductDetails
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public FileStreamResult Image { get; set; }
        
    }
}
