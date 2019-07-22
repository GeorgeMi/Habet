﻿//using System;
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
//    public class AuthController : ApiController
//    {
//        private GHContext db = new GHContext();

//        public HttpResponseMessage Post(UserDTO user)
//        {
//            AuthLogic auth = new AuthLogic();
//            HttpResponseMessage responseMessage;
//            string response = auth.Authenticate(user.Username, user.Password);

//            if (response != null)
//            {
//                // Username si parola valide
//                string role = auth.GetRole(user.Username);
//                TokenMessage msg = new TokenMessage(response, role);
//                responseMessage = Request.CreateResponse(HttpStatusCode.OK, msg);
//            }
//            else
//            {
//                //invalid username and password
//                JSendMessage msg = new JSendMessage("fail", "Invalid username or password");
//                responseMessage = Request.CreateResponse(HttpStatusCode.Forbidden, msg);
//            }

//            return responseMessage;
//        }

//        /// <summary>
//        /// Primire token ce a fost trimis in mailul de activare a contului
//        /// </summary>
//        /// <param name="id">token</param>
//        /// <returns>mesaj succes sau eroare</returns>
//        public HttpResponseMessage Get(string id)
//        {
//            AuthLogic auth = new AuthLogic();
//            HttpResponseMessage response;
//            JSendMessage json;
//            bool verify = auth.VerifyMailToken(id);

//            if (verify)
//            {
//                json = new JSendMessage("success", "Your account has been successfully verified");
//                response = Request.CreateResponse(HttpStatusCode.OK, json);
//            }
//            else
//            {
//                json = new JSendMessage("fail", "Invalid verification link");
//                response = Request.CreateResponse(HttpStatusCode.Forbidden, json);
//            }

//            return response;
//        }
//    }
//}