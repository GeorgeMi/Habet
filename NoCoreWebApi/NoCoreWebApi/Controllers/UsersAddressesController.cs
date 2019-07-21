using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using NoCoreWebApi.Models;

namespace NoCoreWebApi.Controllers
{
    public class UsersAddressesController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/UsersAddresses
        public IQueryable<UsersAddresses> GetUsersAddresses()
        {
            return db.UsersAddresses;
        }

        // GET: api/UsersAddresses/5
        [ResponseType(typeof(UsersAddresses))]
        public async Task<IHttpActionResult> GetUsersAddresses(int id)
        {
            UsersAddresses usersAddresses = await db.UsersAddresses.FindAsync(id);
            if (usersAddresses == null)
            {
                return NotFound();
            }

            return Ok(usersAddresses);
        }

        // PUT: api/UsersAddresses/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUsersAddresses(int id, UsersAddresses usersAddresses)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usersAddresses.UserAdressId)
            {
                return BadRequest();
            }

            db.Entry(usersAddresses).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersAddressesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UsersAddresses
        [ResponseType(typeof(UsersAddresses))]
        public async Task<IHttpActionResult> PostUsersAddresses(UsersAddresses usersAddresses)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UsersAddresses.Add(usersAddresses);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = usersAddresses.UserAdressId }, usersAddresses);
        }

        // DELETE: api/UsersAddresses/5
        [ResponseType(typeof(UsersAddresses))]
        public async Task<IHttpActionResult> DeleteUsersAddresses(int id)
        {
            UsersAddresses usersAddresses = await db.UsersAddresses.FindAsync(id);
            if (usersAddresses == null)
            {
                return NotFound();
            }

            db.UsersAddresses.Remove(usersAddresses);
            await db.SaveChangesAsync();

            return Ok(usersAddresses);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UsersAddressesExists(int id)
        {
            return db.UsersAddresses.Count(e => e.UserAdressId == id) > 0;
        }
    }
}