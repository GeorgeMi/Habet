using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using Api.DTOs;
using Api.Messages;
using Api.Models;
using WebAPI.ActionFilters;

namespace Api.Controllers
{
    // [AuthorizeApiIPAddressAttribute]
    public class ProductsController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/Products
        public HttpResponseMessage GetProducts(int top, int from, string gender, string type)
        {
            HttpResponseMessage responseMessage;
          //  var productList = db.Products.Where(p=> p.Gender == gender && p.Type == type).OrderBy(p => p.ProductId).Skip(from).Take(top).ToList();
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
        [RequireAdminToken]
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
        [System.Web.Http.HttpPost]
        [RequireAdminToken]
        [ResponseType(typeof(Products))]
        public HttpResponseMessage PostProducts()
        {
            HttpResponseMessage responseMessage;
            try
            {            
                var httpRequest = HttpContext.Current.Request;
                var productToAdd = Newtonsoft.Json.JsonConvert.DeserializeObject<Products>(httpRequest.Form["data"]);
                db.Products.Add(productToAdd);

                var postedFile = httpRequest.Files[0];
                
                Stream fs = postedFile.InputStream;
                BinaryReader br = new BinaryReader(fs);
                var bytes = br.ReadBytes((int)fs.Length);
                using (Stream memStream = new MemoryStream(bytes))
                {
                    using (Image img = Image.FromStream(memStream))
                    {
                        ProductsImages imageEntity = new ProductsImages()
                        {
                            Id = Guid.NewGuid(),
                            Name = Encoding.ASCII.GetBytes(postedFile.FileName),
                            Data = bytes,
                            Width = img.Width,
                            Height = img.Height,
                            Length = bytes.Length,
                            ContentType = postedFile.ContentType,
                            ProductId = productToAdd.ProductId
                        };

                        db.ProductsImages.Add(imageEntity);
                    }

                    db.SaveChanges();
                }
            }
            catch (DbUpdateException)
            {
                responseMessage = Request.CreateResponse(HttpStatusCode.BadRequest);
                return responseMessage;
            }

            var json = new JSendMessage("success", "Product successfully added");
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
            return responseMessage;
        }

        // DELETE: api/Products/5
        [RequireAdminToken]
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