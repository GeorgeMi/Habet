using System;
using System.Collections.Generic;
using System.IO;

namespace Api.Models
{
    public partial class Orders
    {
        public Orders()
        {
            ProductsOrders = new HashSet<ProductsOrders>();
        }

        public int OrderId { get; set; }
        public int UserId { get; set; }
        public double Subtotal { get; set; }
        public double Shipping { get; set; }
        public string Currency { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime Date { get; set; }
        public string TransactionId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string State { get; set; }
        public byte[] Invoice { get; set; }
        public bool? MailSent { get; set; }
        public bool? Sent { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<ProductsOrders> ProductsOrders { get; set; }
    }
}
