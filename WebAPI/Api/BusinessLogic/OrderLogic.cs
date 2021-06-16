using System;
using Api.DTOs;
using Api.Models;
using iText.Kernel.Pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Configuration;

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
            mail.From = new MailAddress(ConfigurationManager.AppSettings["mail_user"]);
            mail.To.Add(order.Email);
            mail.Subject = "Information for your Order ";
            mail.Body = "<h3>Hello " + order.FirstName + ", </h3>";
            //string orderId = DateTime.Now.Year + "" + DateTime.Now.Month + "" + DateTime.Now.Day + "" + order.OrderId;
            mail.Body += "<p>Thank you so much for your recent purchase on <a href=\"https://www.gabrielhabet.com/\">www.gabrielhabet.com</a>. Your order number is <a href=\"https://www.gabrielhabet.com/#/order/" + order.OrderId + "\">" + order.OrderId + "</a>.</p>";
            mail.Body += "<p>Your order information is:</ p>";
            mail.Body += "<p><table class=\"table\" style=\"width: 100%\"><tr><th style=\"text-align: left\">Shipping Information:</th><th style=\"text-align: left\">Payment Method:</th></tr><tr><td>"
                                    + "Name: " + order.FirstName + " "
                                   + order.LastName + "<br>"
                                   + "Address: " + order.Address + "<br>"
                                   + order.City + " "
                                   + order.State + "<br>"
                                   + "ZIP: " + order.ZipCode + "<br>"
                                   + "Phone: " + order.Phone+"</td><td>"+order.PaymentMethod+"</td></tr></table></p>";
            mail.Body += "<p><table class=\"table\" style=\"width: 100%\"><tr><th style=\"text-align: left\">Code</th><th style=\"text-align: left\">Product Name</th><th style=\"text-align: left\">QTY</th><th style=\"text-align: left\">Subtotal</th></tr>";
            foreach (var product in products)
            {
                int qty = order.ProductsOrders.FirstOrDefault(p => p.ProductId == product.ProductId).Amount;

                switch (order.Currency)
                {
                    case "RON":
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_RON) + " " + order.Currency + " </td></tr>";
                        break;
                    case "GBP":
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_GBP) + " " + order.Currency + " </td></tr>";
                        break;
                    default:
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_EUR) + " " + order.Currency + " </td></tr>";
                        break;
                }              
            }

            mail.Body += "</table></p>";               
            mail.Body += "<p><table class=\"table\"><tr><th style=\"text-align: left\">Subtotal:</th><td>" + order.Subtotal + " " + order.Currency + "</td></tr><tr><th style=\"text-align: left\">Shipping:</th><td>" + order.Shipping + " " + order.Currency + "</td></tr><tr><th style=\"text-align: left\">Grand Total:</th><td>" + (order.Subtotal + order.Shipping) + " " + order.Currency + "</td></tr></table></p>";
            mail.Body += "The package should normally take 10 business days to arrive (approximately). However, please understand this is an estimate. The shipping speed is outside our control and is dependent on the courier company.";
            mail.Body += "<h5>The GabrielHabet team</h5>";
            mail.IsBodyHtml = true;
            mail.Attachments.Add(new Attachment(invoice, "invoice_" + order.OrderId + ".pdf"));

            SendMail(mail);
        }

        /// <summary>
        /// Trimitere mail de confirmare
        /// </summary>
        /// <param name="token"></param>
        /// <param name="username"></param>
        /// <param name="email"></param>
        public void SendOrderEmailToAdmin(Orders order, List<Products> products, Stream invoice)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(ConfigurationManager.AppSettings["mail_user"]);
            mail.To.Add(ConfigurationManager.AppSettings["admin_mail_to"]);
            mail.CC.Add(ConfigurationManager.AppSettings["admin_mail_cc"]);
            mail.Subject = "New order received";
            mail.Body = "<h3>New order from " + order.Email + ", </h3>";
            //string orderId = DateTime.Now.Year + "" + DateTime.Now.Month + "" + DateTime.Now.Day + "" + order.OrderId;
            mail.Body += "<p>Order number: <a href=\"https://www.gabrielhabet.com/#/order/" + order.OrderId + "\">" + order.OrderId + "</a>.</p>";
            mail.Body += "<p>Order information:</ p>";
            mail.Body += "<style>th, td {padding: 5px;text-align: left;}</style><p><table class=\"table\" style=\"width: 100%\"><tr><th style=\"text-align: left\">Shipping Information:</th><th style=\"text-align: left\">Payment Method:</th></tr><tr><td>"
                                   + "Name: " + order.FirstName + " "
                                   + order.LastName + "<br>"
                                   + "Address: " + order.Address + "<br>"
                                   + order.City + " "
                                   + order.State + "<br>"
                                   + "ZIP: " + order.ZipCode + "<br>"
                                   + "Phone: " + order.Phone + "</td><td>" + order.PaymentMethod + "</td></tr></table></p>";
            mail.Body += "<p><table class=\"table\" style=\"width: 100%\"><tr><th style=\"text-align: left\">Code</th><th style=\"text-align: left\">Product Name</th><th style=\"text-align: left\">QTY</th><th style=\"text-align: left\">Subtotal</th></tr>";
            foreach (var product in products)
            {
                int qty = order.ProductsOrders.FirstOrDefault(p => p.ProductId == product.ProductId).Amount;

                switch (order.Currency)
                {
                    case "RON":
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_RON) + " " + order.Currency + " </td></tr>";
                        break;
                    case "GBP":
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_GBP) + " " + order.Currency + " </td></tr>";
                        break;
                    default:
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_EUR) + " " + order.Currency + " </td></tr>";
                        break;
                }
            }

            mail.Body += "</table></p>";
            mail.Body += "<p><table class=\"table\"><tr><th style=\"text-align: left\">Subtotal:</th><td>" + order.Subtotal + " " + order.Currency + "</td></tr><tr><th style=\"text-align: left\">Shipping:</th><td>" + order.Shipping + " " + order.Currency + "</td></tr><tr><th style=\"text-align: left\">Grand Total:</th><td>" + (order.Subtotal + order.Shipping) + " " + order.Currency + "</td></tr></table></p>";
            mail.IsBodyHtml = true;
            mail.Attachments.Add(new Attachment(invoice, "invoice_" + order.OrderId + ".pdf"));

            SendMail(mail);
        }

        public void SendFailedOrderEmailToAdmin(Orders order, List<Products> products)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(ConfigurationManager.AppSettings["mail_user"]);
            mail.To.Add(ConfigurationManager.AppSettings["admin_mail_to"]);
            mail.CC.Add(ConfigurationManager.AppSettings["admin_mail_cc"]);
            mail.Subject = "Order failed!";
            mail.Body = "<h3>Order from " + order.Email + "failed </h3>";
            //string orderId = DateTime.Now.Year + "" + DateTime.Now.Month + "" + DateTime.Now.Day + "" + order.OrderId;
            mail.Body += "<p>Order information:</ p>";
            mail.Body += "<style>th, td {padding: 5px;text-align: left;}</style><p><table class=\"table\" style=\"width: 100%\"><tr><th style=\"text-align: left\">Shipping Information:</th><th style=\"text-align: left\">Payment Method:</th></tr><tr><td>"
                                   + "Name: " + order.FirstName + " "
                                   + order.LastName + "<br>"
                                   + "Address: " + order.Address + "<br>"
                                   + order.City + " "
                                   + order.State + "<br>"
                                   + "ZIP: " + order.ZipCode + "<br>"
                                   + "Phone: " + order.Phone + "</td><td>" + order.PaymentMethod + "</td></tr></table></p>";
            mail.Body += "<p><table class=\"table\" style=\"width: 100%\"><tr><th style=\"text-align: left\">Code</th><th style=\"text-align: left\">Product Name</th><th style=\"text-align: left\">QTY</th><th style=\"text-align: left\">Subtotal</th></tr>";
            foreach (var product in products)
            {
                int qty = order.ProductsOrders.FirstOrDefault(p => p.ProductId == product.ProductId).Amount;

                switch (order.Currency)
                {
                    case "RON":
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_RON) + " " + order.Currency + " </td></tr>";
                        break;
                    case "GBP":
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_GBP) + " " + order.Currency + " </td></tr>";
                        break;
                    default:
                        mail.Body += "<tr><td>" + product.StyleCode + " " + product.Colour + "</td><td>" + product.Name_EN + "</td><td>" + qty + "</td><td>" + (qty * product.Price_EUR) + " " + order.Currency + " </td></tr>";
                        break;
                }
            }

            mail.Body += "</table></p>";
            mail.Body += "<p><table class=\"table\"><tr><th style=\"text-align: left\">TransactionId:</th><td>" + order.TransactionId + "</td></tr><tr><th style=\"text-align: left\">Subtotal:</th><td>" + order.Subtotal + " " + order.Currency + "</td></tr><tr><th style=\"text-align: left\">Shipping:</th><td>" + order.Shipping + " " + order.Currency + "</td></tr><tr><th style=\"text-align: left\">Grand Total:</th><td>" + (order.Subtotal + order.Shipping) + " " + order.Currency + "</td></tr></table></p>";
            mail.IsBodyHtml = true;

            SendMail(mail);
        }

        public void SendMail(MailMessage mail)
        {
            SmtpClient SmtpServer = new SmtpClient();
            
            SmtpServer.EnableSsl = false;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Port = 26;
            SmtpServer.Host = ConfigurationManager.AppSettings["mail_smtp"];
            SmtpServer.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["mail_user"], ConfigurationManager.AppSettings["mail_password"]);

            SmtpServer.Send(mail);
        }
    }
}