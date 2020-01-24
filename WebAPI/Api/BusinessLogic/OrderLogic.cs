using Api.DTOs;
using Api.Models;
using iText.Kernel.Pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;

namespace Api.BusinessLogic
{
    public class OrderLogic
    {
        private static GHContext _db;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="objDataAccess"></param>
        public OrderLogic(GHContext context)
        {
            _db = context;
        }

        /// <summary>
        /// Trimitere mail de confirmare
        /// </summary>
        /// <param name="token"></param>
        /// <param name="username"></param>
        /// <param name="email"></param>
        public void SendOrderEmail(Orders order, List<Products> products, Stream invoice)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient();
            mail.From = new MailAddress("habetgabriel@gmail.com");
            mail.To.Add(order.Email);
            mail.Subject = "Information for your Order ";
            mail.Body = "<h3>Hello " + order.FirstName + ", </h3>";
            //string orderId = DateTime.Now.Year + "" + DateTime.Now.Month + "" + DateTime.Now.Day + "" + order.OrderId;
            mail.Body += "<p>Thank you so much for your recent purchase on <a href=\"http://gabrielhabet.co.uk/\">gabrielhabet.co.uk</a>. Your order number is <a href=\"http://gabrielhabet.co.uk/#/order/" + order.OrderId + "\">" + order.OrderId + "</a>.</p>";
            mail.Body += "<p>Your order information is:</ p>";
            mail.Body += "<p><table class=\"table\"><tr><th>Shipping Information:</th><th>Payment Method:</th></tr><tr><td>"
                                   + "Name: " + order.FirstName + " "
                                   + order.LastName + "<br>"
                                   + "Address: " + order.Address + "<br>"
                                   + order.City + " "
                                   + order.State + "<br>"
                                   + "ZIP: " + order.ZipCode + "<br>"
                                   + "Phone: " + order.Phone+"</td><td>"+order.PaymentMethod+"</td></tr></table></p>";
            mail.Body += "<p><table class=\"table\"><tr><th>Product Name</th><th>QTY</th><th>Subtotal</th></tr>";
            foreach (var product in products)
            {
                int qty = order.ProductsOrders.FirstOrDefault(p => p.ProductId == product.ProductId).Amount;
                mail.Body += "<tr><td>" + product.Name_EN+ "</td><td>" + qty + "</td><td>" + "&euro; " + (qty * product.Price) + " </td></tr>";
            }

            mail.Body += "</table></p>";               
            mail.Body += "<p><table class=\"table\"><tr><th>Subtotal:</th><td>" + "&euro; " + order.Subtotal+ "</td></tr><tr><th>Shipping:</th><td>" + "&euro; " + order.Shipping + "</td></tr><tr><th>Grand Total:</th><td>" + "&euro; " + (order.Subtotal + order.Shipping) + "</td></tr></table></p>";
            mail.Body += "The package should normally take 10 business days to arrive (approximately). However, please understand this is an estimate. The shipping speed is outside our control and is dependent on the courier company.";
            mail.Body += "<h5>The GabrielHabet team</h5>";
            mail.IsBodyHtml = true;
            mail.Attachments.Add(new Attachment(invoice, "invoice_" + order.OrderId + ".pdf"));

           // SmtpServer.Credentials = new System.Net.NetworkCredential("habetgabriel@gmail.com", "habetpassword");
           //SmtpServer.EnableSsl = false;
           //SmtpServer.UseDefaultCredentials = false;
           //SmtpServer.Port = 25;
           //SmtpServer.Host = "relay-hosting.secureserver.net";


            SmtpServer.Host = "smtp.gmail.com";
            SmtpServer.Port = 587;
            SmtpServer.EnableSsl = true;
            SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("habetgabriel@gmail.com", "habetpassword");

            SmtpServer.Send(mail);
        }
    }
}