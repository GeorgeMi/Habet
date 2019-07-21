using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api
{
    public partial class Roles
    {
        public Roles()
        {
            Users = new HashSet<Users>();
        }
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public virtual ICollection<Users> Users { get; set; }
    }
}
