using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Api.BusinessLogic;
using Api.DTOs;
using Api.Messages;
using Api.Models;

namespace Api.Controllers
{
    // [AuthorizeApiIPAddressAttribute]
    public class ContactController : ApiController
    {
        private static GHContext db = new GHContext();
        readonly UsersLogic users = new UsersLogic(db);

        // POST: api/Contact
        [System.Web.Http.Route("api/Contact")]
        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage PostOrders(SendMessageDTO request)
        {
            HttpResponseMessage response = null;
            JSendMessage json;

            var messageAdded = users.StoreMessage(request);
            if (messageAdded)
            {
                json = new JSendMessage("success", "Message sent");
                response = Request.CreateResponse(HttpStatusCode.OK, json);
            }
            else
            {
                json = new JSendMessage("failed", "Request failed.");
                response = Request.CreateResponse(HttpStatusCode.BadRequest, json);
            }

            return response;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}