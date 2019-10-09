using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Api.BusinessLogic;
using Api.DTOs;
using Api.Messages;
using Api.Models;

namespace Api.Controllers
{
    public class OrdersController : ApiController
    {
        private GHContext db = new GHContext();

        // GET: api/Orders
        public HttpResponseMessage GetOrders()
        {
            HttpResponseMessage responseMessage;
            var token = Request.Headers.SingleOrDefault(x => x.Key == "token").Value.First();
            var userId = db.Tokens.First(u => u.TokenString.Equals(token))?.UserId;

            var orderList = db.Orders.Where(o => o.UserId == userId).OrderByDescending(o=> o.Date).ToList();       

            JSend json = new JSendData<Orders>("success", orderList);
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);

            return responseMessage;
        }

        // GET: api/Orders/5
        public HttpResponseMessage GetOrders(int id, string lang, string currency)
        {
            HttpResponseMessage responseMessage;
            JSend json;
            var token = Request.Headers.SingleOrDefault(x => x.Key == "token").Value.First();
            var userId = db.Tokens.First(u => u.TokenString.Equals(token))?.UserId;

            var order = db.Orders.FirstOrDefault(o=> o.OrderId == id && o.UserId == userId);
            if (order != null)
            {
                var productList = (order.ProductsOrders.Select(product => db.Products.FirstOrDefault(p => p.ProductId == product.ProductId))).ToList();

                var result = new List<ProductInfo>();
                foreach (var product in productList)
                {
                    result.Add(new ProductInfo
                    {
                        Name = ComputeName(product, lang),
                        Price = ExchangePrice(product.Price, currency),
                        ProductId = product.ProductId,
                        Image = new ProductsImagesController().GetProductsImage(product.ProductId)
                    });
                }

                json = new JSendData<ProductInfo>("success", result);
                responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
            }
            else
            {
                json = new JSendMessage("fail", "No items found");
                responseMessage = Request.CreateResponse(HttpStatusCode.NotFound, json);
            }

            return responseMessage;
        }

        // POST: api/Orders
        public HttpResponseMessage PostOrders(AddOrderDTO request)
        {
            HttpResponseMessage responseMessage;
            var token = Request.Headers.SingleOrDefault(x => x.Key == "token").Value.First();

            try
            {
                var userId = db.Tokens.First(u => u.TokenString.Equals(token))?.UserId;
                if (userId > 0)
                {
                    var order = new Orders
                    {
                        Date = DateTime.Now,
                        UserId = userId.Value,
                        FirstName = request.UserDetails.FirstName,
                        LastName = request.UserDetails.LastName,
                        State = request.UserDetails.State,
                        Address = request.UserDetails.StreetAddress,
                        City = request.UserDetails.City,
                        ZipCode = request.UserDetails.ZipCode,
                        Phone = request.UserDetails.Phone,
                        Email = request.UserDetails.Email,
                        ProductsOrders = new List<ProductsOrders>()
                    };

                    double subtotal = 0;
                    var productList = new List<Products>();
                    foreach (var requestProduct in request.CartProducts)
                    {
                       // var product = db.Products.Find(requestProduct.Key);
                       var product = new Products
                       {
                           Name_RO = "Name_RO" + 1,
                           Name_EN = "Name_EN" + 1,
                           Name_IT = "Name_IT" + 1,
                           Price = 1,
                           Description_RO = "Description_RO",
                           Description_EN = "Description_EN",
                           Description_IT = "Description_IT",
                           ProductId = requestProduct.Key
                       };

                        if (product?.ProductId > 0)
                        {
                            var productsOrders = new ProductsOrders
                            {
                                ProductId = product.ProductId,
                                ProductPrice = product.Price,
                                Amount = requestProduct.Value
                            };

                            subtotal += requestProduct.Value;

                            order.ProductsOrders.Add(productsOrders);
                            productList.Add(product);
                        }
                    }

                    order.Subtotal = subtotal;
                    order.Shipping = 0;
                    order.PaymentMethod = request.PaymentMethod;
                     
                    // db.Orders.Add(order);
                    // db.SaveChanges();

                    var OrderLogic = new OrderLogic(db);
                    OrderLogic.SendOrderEmail(order, productList);
                }
            }
            catch (DbUpdateException)
            {
                responseMessage = Request.CreateResponse(HttpStatusCode.BadRequest);
                return responseMessage;
            }

            var json = new JSendMessage("success", "Order successfully added");
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
            return responseMessage;
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

        private double ExchangePrice(double value, string toCurrency)
        {
            double euros_lei_rate = 4.75;
            double euros_pounds_rate = 0.90;
            double result = 0;

            switch (toCurrency)
            {
                case "lei":
                    result = value * euros_lei_rate;
                    break;
                case "pounds":
                    result = value * euros_pounds_rate;
                    break;
                default:
                    result = value;
                    break;
            }

            return (double)System.Math.Round(result, 2);
        }
    }
}