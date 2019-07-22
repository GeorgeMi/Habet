//using System.Linq;
//using System.Net;
//using System.Web.Http.Controllers;
//using System.Web.Http.Filters;
//using System.Net.Http;
//using Api.Messages;
//using Api.BusinessLogic;
//using Api;

//namespace WebAPI.ActionFilters
//{
//    public class RequireToken : ActionFilterAttribute
//    {
//        private GHContext db = new GHContext();
//        /// <summary>
//        /// Constructor
//        /// </summary>
//        public override void OnActionExecuting(HttpActionContext context)
//        {
//            AuthLogic authLogic = new AuthLogic(db);
//            JSendMessage json;
//            var header = context.Request.Headers.SingleOrDefault(x => x.Key == "token");

//            bool valid;

//            if (header.Value == null)
//            {
//                valid = false;
//            }
//            else
//            {
//                valid = authLogic.VerifyTokenDate(header.Value.First());
//            }

//            if (!valid)
//            {
//                // Token invalid
//                json = new JSendMessage("fail", "Invalid Authorization Key");
//                context.Response = context.Request.CreateResponse(HttpStatusCode.Forbidden, json);
//            }
//        }
//    }
//}