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
using Api.DTOs;
using Api.Messages;
using Api.Models;

namespace Api.Controllers
{
    // [AuthorizeApiIPAddressAttribute]
    public class ProductsController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/Products
        public HttpResponseMessage GetProducts(int top, int from)
        {
            HttpResponseMessage responseMessage;
            // var productList = db.Products.OrderBy(p => p.ProductId).Skip(from).Take(top).ToList();
            var productList = new List<Products>();
            Random rnd = new Random();
            for (int i = 0; i < 3; i++)
            {
                productList.Add(new Products { Name = "Name" + i, Price = i, ProductId = rnd.Next(1, 131231) });
            }

            List<ProductInfo> result = new List<ProductInfo>();
            foreach (var product in productList)
            {
                result.Add(new ProductInfo
                {
                    Name = product.Name,
                    Price = product.Price,
                    ProductId = product.ProductId,
                    Image = new ProductsImagesController().GetProductsImages(product.ProductId)
                });
            }

            JSend json = new JSendData<ProductInfo>("success", result);
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);

            return responseMessage;
        }

        // GET: api/Products/5
        [ResponseType(typeof(Products))]
        public HttpResponseMessage GetProducts(int id)
        {
            HttpResponseMessage responseMessage;
            JSend json;
            //  var product = db.Products.Find(id);
            Random rnd = new Random();
            var product = new Products { Name = "Name" + 1, Price = 1, Description= "Description", ProductId = rnd.Next(1, 131231) };


            if (product != null)
            {
                var productDetail = new ProductDetail
                {
                    Name = product.Name,
                    Price = product.Price,
                    ProductId = product.ProductId,
                    Description = product.Description,
                    Image = new ProductsImagesController().GetProductsImages(product.ProductId)
                };

                responseMessage = Request.CreateResponse(HttpStatusCode.OK, productDetail);
            }
            else
            {
                json = new JSendMessage("fail", "No items found");
                responseMessage = Request.CreateResponse(HttpStatusCode.NotFound, json);
            }

            //return new Products { Description = "Description" + id, Name = "Name" + id, Price = id, ProductId = id };
            return responseMessage;
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProducts(int id, Products products)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != products.ProductId)
            {
                return BadRequest();
            }

           // db.Entry(products).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
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

        // POST: api/Products
        [ResponseType(typeof(Products))]
        public async Task<IHttpActionResult> PostProducts(Products products)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Products.Add(products);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = products.ProductId }, products);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Products))]
        public async Task<IHttpActionResult> DeleteProducts(int id)
        {
            Products products = await db.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            db.Products.Remove(products);
            await db.SaveChangesAsync();

            return Ok(products);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductsExists(int id)
        {
            return db.Products.Count(e => e.ProductId == id) > 0;
        }
    }
}