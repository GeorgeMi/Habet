using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Api.DTOs;
using Api.Messages;
using Api.Models;
using WebAPI.ActionFilters;

namespace Api.Controllers
{
    public class UsersController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/Users
        [RequireToken]
        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage GetUsers()
        {
            HttpResponseMessage responseMessage = null;
            var token = Request.Headers.SingleOrDefault(x => x.Key == "token").Value.First();
         //   var userId = db.Tokens.First(u => u.TokenString.Equals(token))?.UserId;

            var result1 = new UserUpdateDetails()
            {
                FirstName = "FirstName",
                LastName = "LastName",
                State = "RO",
                StreetAddress = "StreetAddress",
                City = "City",
                ZipCode = "ZipCode",
                Phone = "Phone",
                Email = "Email"
            };

            JSend json1 = new JSendData<UserUpdateDetails>("success", new List<UserUpdateDetails> { result1 });
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json1);
            return responseMessage;

            //if (userId > 0)
            //{
            //    var user = db.Users.First(u => u.UserId == userId);
            //    user.UsersAddresses = db.UsersAddresses.Where(u => u.UserId == userId).ToList();
            //    if (null != user)
            //    {
            //        var result = new UserUpdateDetails()
            //        {
            //            FirstName = user.FirstName,
            //            LastName = user.LastName,
            //            State = user.UsersAddresses.First().State,
            //            StreetAddress = user.UsersAddresses.First().Address,
            //            City = user.UsersAddresses.First().City,
            //            ZipCode = user.UsersAddresses.First().ZipCode,
            //            Phone = user.Phone,
            //            Email = user.Email
            //        };

            //        JSend json = new JSendData<UserUpdateDetails>("success", new List<UserUpdateDetails> { result });
            //        responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
            //    }
            //}

            //return responseMessage;
        }

        // PUT: api/Users
        [RequireToken]
        [ResponseType(typeof(void))]
        public HttpResponseMessage PutUsers(UserUpdateDetails request)
        {
            HttpResponseMessage responseMessage = null;
            var token = Request.Headers.SingleOrDefault(x => x.Key == "token").Value.First();

            try
            {
                var userId = db.Tokens.First(u => u.TokenString.Equals(token))?.UserId;            
                if (userId > 0)
                {
                    var user = db.Users.First(u => u.UserId == userId);
                    user.UsersAddresses = db.UsersAddresses.Where(u => u.UserId == userId).ToList();

                    user.FirstName = request.FirstName;
                    user.LastName = request.LastName;
                    user.UsersAddresses.First().State = request.State;
                    user.UsersAddresses.First().Address = request.StreetAddress;
                    user.UsersAddresses.First().City = request.City;
                    user.UsersAddresses.First().ZipCode = request.ZipCode;
                    user.Phone = request.Phone;

                    db.Users.Update(user);
                    db.SaveChanges();

                    if (null != user)
                    {
                        var result = new UserUpdateDetails()
                        {
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            State = user.UsersAddresses.First().State,
                            StreetAddress = user.UsersAddresses.First().Address,
                            City = user.UsersAddresses.First().City,
                            ZipCode = user.UsersAddresses.First().ZipCode,
                            Phone = user.Phone
                        };
                    }
                }
                var json = new JSendMessage("success", "Your account has been updated successfully.");
                responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
            }
            catch 
            {
                responseMessage = Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            return responseMessage;
        }

        // POST: api/Users
        [RequireAdminToken]
        [ResponseType(typeof(Users))]
        public async Task<IHttpActionResult> PostUsers(Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(users);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = users.UserId }, users);
        }

        // DELETE: api/Users/5
        [RequireAdminToken]
        [ResponseType(typeof(Users))]
        public async Task<IHttpActionResult> DeleteUsers(int id)
        {
            Users users = await db.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            db.Users.Remove(users);
            await db.SaveChangesAsync();

            return Ok(users);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UsersExists(int id)
        {
            return db.Users.Count(e => e.UserId == id) > 0;
        }
    }
}