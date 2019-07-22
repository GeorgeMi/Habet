//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.Entity;
//using System.Data.Entity.Infrastructure;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Threading.Tasks;
//using System.Web.Http;
//using System.Web.Http.Description;
//using Api;
//using Api.Messages;
//using Api.Models;

//namespace Api.Controllers
//{
//    public class RegistrationController : ApiController
//    {
//        private GHContext db = new GHContext();

//        public HttpResponseMessage Post(UserRegistrationDTO user)
//        {
//            HttpResponseMessage response;
//            JSendMessage json;
//            bool add = user.AddUser(user);

//            if (add)
//            {
//                json = new JSendMessage("success", "Registration successful! Please, verify your mail address.");
//                response = Request.CreateResponse(HttpStatusCode.OK, json);
//            }
//            else
//            {
//                json = new JSendMessage("failed", "Registration failed! Please, try another username or email.");
//                response = Request.CreateResponse(HttpStatusCode.Forbidden, json);
//            }

//            return response;
//        }

//        /// <summary>
//        /// Primire token trimis in mail si activare cont
//        /// </summary>
//        /// <param name="id">token</param>
//        /// <returns>success message sau error message </returns>
//        public HttpResponseMessage Get(string id)
//        {
//            AuthLogic auth = new AuthLogic();
//            bool verify = auth.VerifyMailToken(id);
//            HttpResponseMessage response;
//            JSendMessage json;

//            if (verify)
//            {
//                json = new JSendMessage("success", "Your account has been successfully verified");
//                response = Request.CreateResponse(HttpStatusCode.OK, json);
//            }
//            else
//            {
//                json = new JSendMessage("failed", "Invalid verification link");
//                response = Request.CreateResponse(HttpStatusCode.Forbidden, json);
//            }

//            return response;
//        }
//    }
//}