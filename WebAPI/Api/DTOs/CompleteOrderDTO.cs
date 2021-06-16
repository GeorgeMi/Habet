using System.Collections.Generic;

namespace Api.DTOs
{
    public class CompleteOrderDTO
    {
        public int OrderId { get; set; }
        public bool PaymentStatus { get; set; }
        public string PaymentMethod { get; set; }
        public string TransactionId { get; set; }
    }
}