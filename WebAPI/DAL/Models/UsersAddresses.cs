using System;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public partial class UsersAddresses
    {
        public int UserAdressId { get; set; }
        public int UserId { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string StreetNo { get; set; }
        public string ZipCode { get; set; }

        public virtual Users User { get; set; }
    }
}
