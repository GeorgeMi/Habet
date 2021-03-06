﻿using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;

namespace Api.DTOs
{
    public class GetOrderDTO
    {
        public UserUpdateDetails UserDetails { get; set; }
        public List<OrderProductInfo> Products { get; set; }
        public string PaymentMethod { get; set; }
        public string Currency { get; set; }
        public double Subtotal { get; set; }
        public double Shipping { get; set; }
        public byte[] Invoice { get; set; }
        public bool? Sent { get; set; }
    }
}