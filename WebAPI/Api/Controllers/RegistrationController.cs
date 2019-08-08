using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Transactions;
using System.Web.Http;
using System.Web.Http.Description;
using Api.BusinessLogic;
using Api.DTOs;
using Api.Messages;
using Api.Models;

namespace Api.Controllers
{
    public class RegistrationController : ApiController
    {
        private static GHContext db = new GHContext();

        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage Post(UserRegistration user)
        {
            HttpResponseMessage response;
            JSendMessage json;

            var userAddress = new UsersAddresses
            {
                Address = user.StreetAddress,
                City = user.City,
                ZipCode = user.ZipCode,
                State = user.State
            };

            var userDetails = new Users {
                UserId = 0,
                Email = user.Email,
                Password = user.Password,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.Phone,
                Role = "user",
                Verified = "no",
                UsersAddresses = new List<UsersAddresses> { userAddress }
            };

            //using (TransactionScope transaction = new TransactionScope())
            //{
                var UsersLogic = new UsersLogic(db);
                var added = UsersLogic.AddUser(userDetails);
                if (added)
                {
                  //  db.SaveChanges();
                  //  transaction.Complete();
                    json = new JSendMessage("success", "Registration  was successful! Please, verify your mail address.");
                    response = Request.CreateResponse(HttpStatusCode.OK, json);
                }
                else
                {
                    json = new JSendMessage("failed", "Registration failed! Please, try another email.");
                    response = Request.CreateResponse(HttpStatusCode.Forbidden, json);
                }        
           // }

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