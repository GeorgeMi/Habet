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
    public class RolesController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/Roles
        public IQueryable<Roles> GetRoles()
        {
            return db.Roles;
        }

        // GET: api/Roles/5
        [ResponseType(typeof(Roles))]
        public async Task<IHttpActionResult> GetRoles(int id)
        {
            Roles roles = await db.Roles.FindAsync(id);
            if (roles == null)
            {
                return NotFound();
            }

            return Ok(roles);
        }

        // PUT: api/Roles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRoles(int id, Roles roles)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roles.RoleId)
            {
                return BadRequest();
            }

            db.Entry(roles).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolesExists(id))
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

        // POST: api/Roles
        [ResponseType(typeof(Roles))]
        public async Task<IHttpActionResult> PostRoles(Roles roles)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Roles.Add(roles);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = roles.RoleId }, roles);
        }

        // DELETE: api/Roles/5
        [ResponseType(typeof(Roles))]
        public async Task<IHttpActionResult> DeleteRoles(int id)
        {
            Roles roles = await db.Roles.FindAsync(id);
            if (roles == null)
            {
                return NotFound();
            }

            db.Roles.Remove(roles);
            await db.SaveChangesAsync();

            return Ok(roles);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RolesExists(int id)
        {
            return db.Roles.Count(e => e.RoleId == id) > 0;
        }
    }
}