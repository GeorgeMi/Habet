using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Api.BusinessLogic;
using Api.DTOs;
using Api.Messages;
using Api.Models;
using WebAPI.ActionFilters;

namespace Api.Controllers
{
    public class AuthController : ApiController
    {
        private static GHContext db = new GHContext();
        readonly AuthLogic auth = new AuthLogic(db);
        readonly UsersLogic users = new UsersLogic(db);

        [Route("api/Auth")]
        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage Post(UserDTO user)
        {
            HttpResponseMessage responseMessage;
            //string response = auth.Authenticate(user.Email, user.Password);
            string response = "123";

            if (response != null)
            {
                // Username si parola valide
                // string role = users.GetUserRole(user.Email);
                string role = "user";
                TokenMessage msg = new TokenMessage(response, role);
                responseMessage = Request.CreateResponse(HttpStatusCode.OK, msg);
            }
            else
            {
                //invalid username and password
                JSendMessage msg = new JSendMessage("fail", "Invalid username or password");
                responseMessage = Request.CreateResponse(HttpStatusCode.Forbidden, msg);
            }

            return responseMessage;
        }

        [Route("api/AuthToken")]
        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage Post(TokenDTO token)
        {
            HttpResponseMessage responseMessage;
            JSendMessage json;
            bool valid;
 
            if (token.Token == null)
            {
                valid = false;
            }
            else
            {
                valid = auth.VerifyTokenDate(token.Token);
            }

            if (!valid)
            {
                // Token invalid
                json = new JSendMessage("fail", "Invalid Authorization Key");
                responseMessage = Request.CreateResponse(HttpStatusCode.Forbidden, json);
            }
            else
            {
                json = new JSendMessage("success", "ok");
                responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
            }

            return responseMessage;
        }

        [Route("api/Recover")]
        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage Post(RecoverDTO email)
        {
            HttpResponseMessage responseMessage;
            if (email.Email != null)
            {
                users.RecoverPassword(email.Email);
            }

            responseMessage = Request.CreateResponse(HttpStatusCode.OK);
            return responseMessage;
        }

        [Route("api/ChangePassword")]
        [RequireToken]
        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage Post(ChangePasswordDTO request)
        {
            HttpResponseMessage responseMessage = null;
            JSendMessage json;

            if (request.Password != null)
            {
                var token = Request.Headers.SingleOrDefault(x => x.Key == "token").Value.First();
                var updated = users.ChangePassword(token, request.Password);
                if (!updated)
                {
                    responseMessage = Request.CreateResponse(HttpStatusCode.BadRequest);
                }
                else
                {
                    json = new JSendMessage("success", "Your password has been successfully changed");
                    responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
                }
            }
            return responseMessage;
        }

        /// <summary>
        /// Primire token ce a fost trimis in mailul de activare a contului
        /// </summary>
        /// <param name="id">token</param>
        /// <returns>mesaj succes sau eroare</returns>
        public HttpResponseMessage Get(string id)
        {
            HttpResponseMessage response;
            JSendMessage json;
            bool verify = auth.VerifyMailToken(id);

            if (verify)
            {
                json = new JSendMessage("success", "Your account has been successfully verified");
                response = Request.CreateResponse(HttpStatusCode.OK, json);
            }
            else
            {
                json = new JSendMessage("fail", "Invalid verification link");
                response = Request.CreateResponse(HttpStatusCode.Forbidden, json);
            }

            return response;
        }
    }
}