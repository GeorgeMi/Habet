using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Messages
{
    public class JSend
    {
        public string status;

        public JSend(string status)
        {
            this.status = status;
        }
    }
}