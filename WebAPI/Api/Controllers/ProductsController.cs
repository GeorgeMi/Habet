using Api.DTOs;
using Api.Messages;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
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
using WebAPI.ActionFilters;

namespace Api.Controllers
{
    //  [AuthorizeApiIPAddressAttribute]
    public class ProductsController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/Products
        public HttpResponseMessage GetProducts(int top, int from, string gender, string type, string lang, string currency)
        {
            HttpResponseMessage responseMessage;
            var productList = new List<Products>();

            if (type == "intro")
            {
                productList = db.Products.OrderByDescending(p => p.Price_RON).Skip(Math.Max(0, db.Products.Count() - top)).Take(top).ToList();
            }
            else
            {
                productList = db.Products.Where(p => p.Gender == gender && p.Type == type).OrderByDescending(p => p.Price_RON).ThenBy(p => p.Name_RO).Skip(from).Take(top).ToList();
            }

            //Random rnd = new Random();
            //for (int i = 0; i < 3; i++)
            //{
            //    productList.Add(new Products
            //    {
            //        Name_RO = "Name_RO" + i,
            //        Name_EN = "Name_EN" + i,
            //        Name_IT = "Name_IT" + i,
            //        Price = i + 1,
            //        ProductId = rnd.Next(1, 4)
            //    });
            //}

            List<ProductInfo> result = new List<ProductInfo>();
            foreach (var product in productList)
            {
                result.Add(new ProductInfo
                {
                    Name = ComputeName(product, lang),
                    Price = GetCurrencyPrice(product, currency),
                    ProductId = product.ProductId,
                    Image = new ProductsImagesController().GetProductsImage(product.ProductId)
                });
            }

            JSend json = new JSendData<ProductInfo>("success", result);
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);

            return responseMessage;
        }

        // GET: api/Products/5
        [ResponseType(typeof(Products))]
        public HttpResponseMessage GetProducts(int productId, string lang, string currency)
        {
            HttpResponseMessage responseMessage;
            JSend json;
            var product = db.Products.Find(productId);

            //Random rnd = new Random();
            //var product = new Products
            //{
            //    Name_RO = "Name_RO" + 1,
            //    Name_EN = "Name_EN" + 1,
            //    Name_IT = "Name_IT" + 1,
            //    Price = 1,
            //    Description_RO = "Description_RO",
            //    Description_EN = "Description_EN",
            //    Description_IT = "Description_IT",
            //    ProductId = rnd.Next(1, 4)
            //};

            if (product != null)
            {
                var productDetail = new ProductDetail
                {
                    Name = ComputeName(product, lang),
                    Price = GetCurrencyPrice(product, currency),
                    ProductId = product.ProductId,
                    Description = ComputeDescription(product, lang),
                    Image = new ProductsImagesController().GetProductsImages(product.ProductId),
                    StyleCode = product.StyleCode,
                    LeatherType = product.LeatherType,
                    Colour = product.Colour
                };

                responseMessage = Request.CreateResponse(HttpStatusCode.OK, productDetail);
            }
            else
            {
                json = new JSendMessage("fail", "No items found");
                responseMessage = Request.CreateResponse(HttpStatusCode.NotFound, json);
            }

            return responseMessage;
        }

        // GET: api/Products/5
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/ChartProducts")]
        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage GetCartProducts(GetCartProductsDTO request)
        {
            HttpResponseMessage responseMessage;
            var productList = db.Products.Where(p => request.ProductIds.Contains(p.ProductId)).ToList();

            //var productList = new List<Products>();
            //Random rnd = new Random();
            //for (int i = 0; i < request.ProductIds.Count; i++)
            //{
            //    productList.Add(new Products
            //    {
            //        Name_RO = "Name_RO" + i,
            //        Name_EN = "Name_EN" + i,
            //        Name_IT = "Name_IT" + i,
            //        Price = i + 1,
            //        ProductId = request.ProductIds[i]
            //    });
            //}

            var result = new List<ProductInfo>();
            foreach (var product in productList)
            {
                result.Add(new ProductInfo
                {
                    Name = ComputeName(product, request.Lang),
                    Price = GetCurrencyPrice(product, request.Currency),
                    ProductId = product.ProductId,
                    Image = new ProductsImagesController().GetProductsImage(product.ProductId)
                });
            }

            JSend json = new JSendData<ProductInfo>("success", result);
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);

            return responseMessage;
        }

        // GET: api/Products/5
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/SearchProducts")]
        [ResponseType(typeof(HttpResponseMessage))]
        public HttpResponseMessage GetSearchProducts(SearchProductsDTO request)
        {
            HttpResponseMessage responseMessage;
            double priceFrom = request.PriceFrom;
            double priceTo = request.PriceTo;

            List<Products> productList;

            switch (request.Currency)
            {
                case "RON":
                    productList = db.Products.Where(p => p.Gender == request.Gender && p.Type == request.Type && p.Price_RON >= priceFrom && p.Price_RON <= priceTo).ToList();
                    break;
                case "GBP":
                    productList = db.Products.Where(p => p.Gender == request.Gender && p.Type == request.Type && p.Price_GBP >= priceFrom && p.Price_GBP <= priceTo).ToList();
                    break;
                default:
                    productList = db.Products.Where(p => p.Gender == request.Gender && p.Type == request.Type && p.Price_EUR >= priceFrom && p.Price_EUR <= priceTo).ToList();
                    break;
            }

            var responseProductList = productList.OrderBy(p => p.ProductId).Skip(request.From).Take(request.Top).ToList();

            //var responseProductList = new List<Products>();
            //Random rnd = new Random();
            //for (int i = 0; i < request.Top; i++)
            //{
            //    int x = rnd.Next(1, 4);
            //    responseProductList.Add(new Products
            //    {
            //        Name_RO = "Name_RO" + x,
            //        Name_EN = "Name_EN" + x,
            //        Name_IT = "Name_IT" + x,
            //        Price = x + 1,
            //        ProductId = x
            //    });
            //}

            var result = new SearchDetails
            {
                Products = new List<ProductInfo>()
            };

            foreach (var product in responseProductList)
            {
                result.Products.Add(new ProductInfo
                {
                    Name = ComputeName(product, request.Lang),
                    Price = GetCurrencyPrice(product, request.Currency),
                    ProductId = product.ProductId,
                    Image = new ProductsImagesController().GetProductsImage(product.ProductId)
                });
            }

            result.TotalItemsCount = productList.Count();

            responseMessage = Request.CreateResponse(HttpStatusCode.OK, result);

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
                db.SaveChanges();

                foreach (string fileName in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[fileName];
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
                                ProductId = productToAdd.ProductId,
                                Date = DateTime.Now
                            };

                            db.ProductsImages.Add(imageEntity);
                        }

                        db.SaveChanges();
                    }
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
        public async Task<HttpResponseMessage> DeleteProducts(int id)
        {
            HttpResponseMessage responseMessage;
            try
            {
                Products products = await db.Products.FindAsync(id);
                if (products == null)
                {
                    responseMessage = Request.CreateResponse(HttpStatusCode.BadRequest);
                    return responseMessage;
                }

                db.Products.Remove(products);
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                responseMessage = Request.CreateResponse(HttpStatusCode.BadRequest);
                return responseMessage;
            }

            var json = new JSendMessage("success", "Product successfully removed");
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
            return responseMessage;
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

        public double GetCurrencyPrice(Products product, string toCurrency)
        {
            switch (toCurrency)
            {
                case "RON":
                    return product.Price_RON;
                case "GBP":
                    return product.Price_GBP;
                default:
                    return product.Price_EUR;
            }
        }

   
        private string ComputeName(Products product, string lang)
        {
            string name;
            switch (lang)
            {
                case "ro":
                    name = product.Name_RO;
                    break;
                case "it":
                    name = product.Name_IT;
                    break;
                default:
                    name = product.Name_EN;
                    break;
            }

            return name;
        }

        private string ComputeDescription(Products product, string lang)
        {
            string description;
            switch (lang)
            {
                case "ro":
                    description = product.Description_RO;
                    break;
                case "it":
                    description = product.Description_IT;
                    break;
                default:
                    description = product.Description_EN;
                    break;
            }

            return description;
        }
    }
}