using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api
{
    public partial class Users
    {
        public Users()
        {
            Orders = new HashSet<Orders>();
            UsersAddresses = new HashSet<UsersAddresses>();
            //Tokens = new List<Tokens>();
        }
        [Key]
        public int UserId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Pass { get; set; }
        public int? RoleId { get; set; }
        public string Verified { get; set; }

        public virtual Roles Role { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
        public virtual ICollection<UsersAddresses> UsersAddresses { get; set; }
   //     public virtual ICollection<Tokens> Tokens { get; set; }
    }
}
