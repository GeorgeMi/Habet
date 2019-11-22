using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.DTOs
{
    public class ListOrdersDTO
    {
        public int OrderId { get; set; }
        public string Total { get; set; }
        public string Date { get; set; }
    }
}