using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using Api.BusinessLogic;
using Api.DTOs;
using Api.Messages;
using Api.Models;
using WebAPI.ActionFilters;

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

            var orderList = db.Orders.Where(o => o.UserId == userId).OrderByDescending(o => o.Date).ToList();
            //var orderList = new List<Orders>();

            //Random rnd = new Random();
            //for (int i = 0; i < 3; i++)
            //{
            //    orderList.Add(new Orders
            //    {
            //        Subtotal = i ^ 3,
            //        Shipping = i,
            //        Date = DateTime.Now.AddMonths(-i),
            //        OrderId = rnd.Next(1, 4),
            //        Currency = "RON"
            //    });
            //}

            var responseOrderList = new List<ListOrdersDTO>();

            foreach (var order in orderList)
            {
                responseOrderList.Add(new ListOrdersDTO
                {
                    OrderId = order.OrderId,
                    Total = (order.Subtotal + order.Shipping) + " " + order.Currency,
                    Date = string.Format("{0:f}", order.Date)
                });
            }

            JSend json = new JSendData<ListOrdersDTO>("success", responseOrderList);
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);

            return responseMessage;
        }

        [RequireAdminToken]
        public HttpResponseMessage GetOrders(bool deliveredFilter)
        {
            HttpResponseMessage responseMessage;
            List<Orders> orderList;
            if (deliveredFilter)
            {
                orderList = db.Orders.Where(o => o.Sent == true).OrderByDescending(o => o.Date).ToList();
            }
            else
            {
                orderList = db.Orders.Where(o => o.Sent != true).OrderByDescending(o => o.Date).ToList();
            }

            //var orderList = new List<Orders>();

            //Random rnd = new Random();
            //for (int i = 0; i < 3; i++)
            //{
            //    orderList.Add(new Orders
            //    {
            //        Subtotal = i ^ 3,
            //        Shipping = i,
            //        Date = DateTime.Now.AddMonths(-i),
            //        OrderId = rnd.Next(1, 4),
            //        Currency = "RON",
            //        Email = "test@mail.com"
            //    });
            //}

            var responseOrderList = new List<ListOrdersDTO>();

            foreach (var order in orderList)
            {
                responseOrderList.Add(new ListOrdersDTO
                {
                    OrderId = order.OrderId,
                    Total = (order.Subtotal + order.Shipping) + " " + order.Currency,
                    Date = string.Format("{0:f}", order.Date)
                });
            }

            JSend json = new JSendData<ListOrdersDTO>("success", responseOrderList);
            responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);

            return responseMessage;
        }

        // GET: api/Orders/5
        public HttpResponseMessage GetOrders(int orderId, string lang)
        {
            HttpResponseMessage responseMessage;
            JSend json;
            var token = Request.Headers.SingleOrDefault(x => x.Key == "token").Value.First();
            var userId = db.Tokens.First(u => u.TokenString.Equals(token))?.UserId;

            var order = db.Orders.FirstOrDefault(o => o.OrderId == orderId && o.UserId == userId);
            //var order = new Orders
            //{
            //    FirstName = "FirstName",
            //    LastName = "LastName",
            //    State = "State",
            //    Address = "Address",
            //    City = "City",
            //    ZipCode = "ZipCode",
            //    Phone = "Phone",
            //    Email = "Email",
            //    PaymentMethod = "Cash",
            //    Currency = "RON",
            //    ProductsOrders = new List<ProductsOrders>(),
            //    Subtotal = 123,
            //    Shipping = 20
            //};

            //for (int i = 0; i < 3; i++)
            //{
            //    order.ProductsOrders.Add(new ProductsOrders
            //    {
            //        OrderId = orderId,
            //        ProductId = i,
            //        ProductPrice = i + 1,
            //        Amount = i + 1,

            //    });
            //}

            if (order != null)
            {
                 var productsOrdersList = db.ProductsOrders.Where(o => o.OrderId == order.OrderId);
                 var productList = productsOrdersList.Select(product => db.Products.FirstOrDefault(p => p.ProductId == product.ProductId && product.OrderId == order.OrderId)).ToList();

                //var productList = new List<Products>();
                //for (int i = 0; i < 3; i++)
                //{
                //    productList.Add(new Products
                //    {
                //        Name_RO = "Name_RO" + i,
                //        Name_EN = "Name_EN" + i,
                //        Name_IT = "Name_IT" + i,
                //        Price = i + 1,
                //        ProductId = i
                //    });
                //}

                var result = new GetOrderDTO()
                {
                    UserDetails = new UserUpdateDetails
                    {
                        FirstName = order.FirstName,
                        LastName = order.LastName,
                        State = order.State,
                        StreetAddress = order.Address,
                        City = order.City,
                        ZipCode = order.ZipCode,
                        Phone = order.Phone,
                        Email = order.Email
                    },
                    PaymentMethod = order.PaymentMethod,
                    Currency = order.Currency,
                    Subtotal = order.Subtotal,
                    Shipping = order.Shipping,
                    Products = new List<OrderProductInfo>(),
                    Invoice = order.Invoice,
                    Sent = order.Sent
                };

                foreach (var product in productList)
                {
                    var productsOrder = productsOrdersList.FirstOrDefault(p => p.ProductId == product.ProductId);
                    result.Products.Add(new OrderProductInfo
                    {
                        Name = ComputeName(product, lang),
                        Price = productsOrder.ProductPrice,
                        ProductId = product.ProductId,
                        Amount = productsOrder.Amount,
                        Image = new ProductsImagesController().GetProductsImage(product.ProductId)
                    });
                }

                responseMessage = Request.CreateResponse(HttpStatusCode.OK, result);
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
                //int? userId = 1;
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
                        Currency = request.Currency,
                        TransactionId = request.TransactionId,
                        ProductsOrders = new List<ProductsOrders>()
                    };

                    db.Orders.Add(order);
                    db.SaveChanges();

                    var x = order.OrderId;

                    double subtotal = 0;
                    var productList = new List<Products>();
                    foreach (var requestProduct in request.CartProducts)
                    {
                        var product = db.Products.Find(requestProduct.Key);
                        //var product = new Products
                        //{
                        //    Name_RO = "Name_RO" + 1,
                        //    Name_EN = "Name_EN" + 1,
                        //    Name_IT = "Name_IT" + 1,
                        //    Price = 100,
                        //    Description_RO = "Description_RO",
                        //    Description_EN = "Description_EN",
                        //    Description_IT = "Description_IT",
                        //    ProductId = requestProduct.Key
                        //};

                        if (product?.ProductId > 0)
                        {
                            var productsOrders = new ProductsOrders
                            {
                                ProductId = product.ProductId,
                                ProductPrice = GetCurrencyPrice(product, order.Currency),
                                Amount = requestProduct.Value,
                                OrderId = order.OrderId,
                                Currency = order.Currency,
                                ProductProduct = product
                            };

                            subtotal += productsOrders.ProductPrice * productsOrders.Amount;

                            order.ProductsOrders.Add(productsOrders);
                            productList.Add(product);
                        }
                    }

                    order.Subtotal = subtotal;
                    order.Shipping = 0;
                    order.PaymentMethod = request.PaymentMethod;

                    db.Orders.Update(order);
                    db.SaveChanges();

                    var InvoiceLogic = new InvoiceLogic(db);
                    var invoice = InvoiceLogic.CreateInvoice(order);
                    order.Invoice = invoice.ToArray();

                    db.Orders.Update(order);
                    db.SaveChanges();

                    var OrderLogic = new OrderLogic(db);
                    OrderLogic.SendOrderEmail(order, productList, invoice);

                    order.MailSent = true;

                    db.Orders.Update(order);
                    db.SaveChanges();

                    OrderLogic.SendOrderEmailToAdmin(order, productList, invoice);
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

        // POST: api/Orders
        [RequireAdminToken]
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/EditOrders")]
        public HttpResponseMessage EditOrders(UpdateOrderDTO request)
        {
            HttpResponseMessage responseMessage;
            JSendMessage json;

            var order = db.Orders.FirstOrDefault(o => o.OrderId == request.OrderId);
            if (null != order)
            {
                order.Sent = request.Sent;

                db.Orders.Update(order);
                db.SaveChanges();

                json = new JSendMessage("success", "Order successfully updated");
                responseMessage = Request.CreateResponse(HttpStatusCode.OK, json);
            }
            else
            {
                json = new JSendMessage("success", "Order not found");
                responseMessage = Request.CreateResponse(HttpStatusCode.NotFound, json);
            }
           
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

        public double GetCurrencyPrice(Products product, string toCurrency)
        {
            switch (toCurrency)
            {
                case "RON":
                    return product.Price_RON;
                    break;
                case "GBP":
                    return product.Price_GBP;
                    break;
                default:
                    return product.Price_EUR;
                    break;
            }
        }
    }
}