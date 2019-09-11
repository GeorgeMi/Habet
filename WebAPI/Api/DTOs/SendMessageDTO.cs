using System;

namespace Api.DTOs
{
    public class SendMessageDTO
    {
        public String Name { get; set; }
        public String Email { get; set; }
        public String Subject { get; set; }
        public String Message { get; set; }
    }
}