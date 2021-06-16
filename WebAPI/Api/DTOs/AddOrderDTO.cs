using System.Collections.Generic;

namespace Api.DTOs
{
    public class AddOrderDTO
    {
        public UserUpdateDetails UserDetails { get; set; }
        public Dictionary<int,int> CartProducts { get; set; }
        public string PaymentMethod { get; set; }
        public string Currency { get; set; }
        public string Lang { get; set; }
        public string TransactionId { get; set; }
    }
}