using Api.BusinessLogic;
using Api.Messages;
using Api.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace WebAPI.ActionFilters
{
    public class RequireAdminToken : ActionFilterAttribute
    {
        private GHContext db = new GHContext();
        /// <summary>
        /// Constructor
        /// </summary>
        public override void OnActionExecuting(HttpActionContext context)
        {
            AuthLogic authLogic = new AuthLogic(db);
            JSendMessage json;

            var header = context.Request.Headers.SingleOrDefault(x => x.Key == "token");

            bool valid, isAdmin, okDate;

            if (header.Value == null)
            {
                valid = false;
            }
            else
            {
                // Tokenul apartine unui admin
                isAdmin = authLogic.VerifyAdminToken(header.Value.First());

                // Tokenul este valid
                okDate = authLogic.VerifyTokenDate(header.Value.First());

                valid = isAdmin && okDate;
            }

            if (!valid)
            {
                json = new JSendMessage("fail", "Invalid Authorization Key");
                context.Response = context.Request.CreateResponse(HttpStatusCode.Forbidden, json);
            }
        }
    }
}