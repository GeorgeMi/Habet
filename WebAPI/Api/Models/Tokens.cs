using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class Tokens
    {
        public int TokenId { get; set; }
        public int UserId { get; set; }
        public string TokenString { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime ExpirationDate { get; set; }
        public virtual Users User { get; set; }
    }
}