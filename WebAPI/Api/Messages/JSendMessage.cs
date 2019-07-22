using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Messages
{
    public class JSendMessage : JSend
    {
        public string message;

        public JSendMessage(string status, string message) : base(status)
        {
            this.message = message;
        }
    }
}