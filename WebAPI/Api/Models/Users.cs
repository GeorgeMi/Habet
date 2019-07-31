using System;
using System.Collections.Generic;

namespace Api.Models
{
    public partial class Users
    {
        public Users()
        {
            Orders = new HashSet<Orders>();
            Tokens = new HashSet<Tokens>();
            UsersAddresses = new HashSet<UsersAddresses>();
        }

        public int UserId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Verified { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
        public virtual ICollection<Tokens> Tokens { get; set; }
        public virtual ICollection<UsersAddresses> UsersAddresses { get; set; }
    }
}
