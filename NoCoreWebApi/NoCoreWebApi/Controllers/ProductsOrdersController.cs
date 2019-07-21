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
    public class ProductsOrdersController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/ProductsOrders
        public IQueryable<ProductsOrders> GetProductsOrders()
        {
            return db.ProductsOrders;
        }

        // GET: api/ProductsOrders/5
        [ResponseType(typeof(ProductsOrders))]
        public async Task<IHttpActionResult> GetProductsOrders(int id)
        {
            ProductsOrders productsOrders = await db.ProductsOrders.FindAsync(id);
            if (productsOrders == null)
            {
                return NotFound();
            }

            return Ok(productsOrders);
        }

        // PUT: api/ProductsOrders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProductsOrders(int id, ProductsOrders productsOrders)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productsOrders.ProductId)
            {
                return BadRequest();
            }

            db.Entry(productsOrders).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsOrdersExists(id))
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

        // POST: api/ProductsOrders
        [ResponseType(typeof(ProductsOrders))]
        public async Task<IHttpActionResult> PostProductsOrders(ProductsOrders productsOrders)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductsOrders.Add(productsOrders);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = productsOrders.ProductId }, productsOrders);
        }

        // DELETE: api/ProductsOrders/5
        [ResponseType(typeof(ProductsOrders))]
        public async Task<IHttpActionResult> DeleteProductsOrders(int id)
        {
            ProductsOrders productsOrders = await db.ProductsOrders.FindAsync(id);
            if (productsOrders == null)
            {
                return NotFound();
            }

            db.ProductsOrders.Remove(productsOrders);
            await db.SaveChangesAsync();

            return Ok(productsOrders);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductsOrdersExists(int id)
        {
            return db.ProductsOrders.Count(e => e.ProductId == id) > 0;
        }
    }
}