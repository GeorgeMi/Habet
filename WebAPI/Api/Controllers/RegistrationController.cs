﻿using System.Net;
using System.Net.Http;
using System.Web.Http;
using Api.BusinessLogic;
using Api.DTOs;
using Api.Messages;
using Api.Models;

namespace Api.Controllers
{
    public class RegistrationController : ApiController
    {
        private GHContext db = new GHContext();

        public HttpResponseMessage Post(UserRegistration user)
        {
            HttpResponseMessage response;
            JSendMessage json;
            bool add = db.Users.Add(new Users {Email = user.Email, Pass = user.Password }) !=  null;

            if (add)
            {
                json = new JSendMessage("success", "Registration successful! Please, verify your mail address.");
                response = Request.CreateResponse(HttpStatusCode.OK, json);
            }
            else
            {
                json = new JSendMessage("failed", "Registration failed! Please, try another email.");
                response = Request.CreateResponse(HttpStatusCode.Forbidden, json);
            }

            return response;
        }

        /// <summary>
        /// Primire token trimis in mail si activare cont
        /// </summary>
        /// <param name="id">token</param>
        /// <returns>success message sau error message </returns>
        public HttpResponseMessage Get(string id)
        {
            AuthLogic auth = new AuthLogic(db);
            bool verify = auth.VerifyMailToken(id);
            HttpResponseMessage response;
            JSendMessage json;

            if (verify)
            {
                json = new JSendMessage("success", "Your account has been successfully verified");
                response = Request.CreateResponse(HttpStatusCode.OK, json);
            }
            else
            {
                json = new JSendMessage("failed", "Invalid verification link");
                response = Request.CreateResponse(HttpStatusCode.Forbidden, json);
            }

            return response;
        }
    }
}