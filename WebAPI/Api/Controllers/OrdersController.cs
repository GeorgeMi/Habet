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
using Api;
using Api.Models;

namespace Api.Controllers
{
    public class OrdersController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/Orders
        public IQueryable<Orders> GetOrders()
        {
            return db.Orders;
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Orders))]
        public async Task<IHttpActionResult> GetOrders(int id)
        {
            Orders orders = await db.Orders.FindAsync(id);
            if (orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOrders(int id, Orders orders)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orders.OrderId)
            {
                return BadRequest();
            }

         //   db.Entry(orders).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdersExists(id))
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

        // POST: api/Orders
        [ResponseType(typeof(Orders))]
        public async Task<IHttpActionResult> PostOrders(Orders orders)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Orders.Add(orders);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = orders.OrderId }, orders);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Orders))]
        public async Task<IHttpActionResult> DeleteOrders(int id)
        {
            Orders orders = await db.Orders.FindAsync(id);
            if (orders == null)
            {
                return NotFound();
            }

            db.Orders.Remove(orders);
            await db.SaveChangesAsync();

            return Ok(orders);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrdersExists(int id)
        {
            return db.Orders.Count(e => e.OrderId == id) > 0;
        }
    }
}