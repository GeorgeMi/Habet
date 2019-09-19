using System;

namespace Api.Models
{
    public partial class Tokens
    {
        public int TokenId { get; set; }
        public int UserId { get; set; }
        public string TokenString { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ExpirationDate { get; set; }

        public virtual Users User { get; set; }
    }
}
