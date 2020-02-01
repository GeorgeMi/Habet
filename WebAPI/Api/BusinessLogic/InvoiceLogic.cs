using Api.Models;
using iText.IO.Font.Constants;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;
using System.IO;
using System.Web;

namespace Api.BusinessLogic
{
    public class InvoiceLogic
    {
        private GHContext _db;
        
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="objDataAccess"></param>
        public InvoiceLogic(GHContext context)
        {
            _db = context;            
        }

        /// <summary>
        /// Verifica daca in baza de date exista un tuplu ce corespunde cu datele introduse
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public MemoryStream CreateInvoice(Orders order)
        {
            try
            {
                var reader = new PdfReader(HttpContext.Current.Server.MapPath("~")+"/Invoice/invoice.pdf");               
                var stream = new MemoryStream();
                var writer = new PdfWriter(stream);
                var pdfDocument = new PdfDocument(reader, writer);
                var document = new Document(pdfDocument);
                var font = PdfFontFactory.CreateFont(StandardFonts.COURIER);

                // Invoice No.
                document.Add(new Paragraph(order.OrderId.ToString()).SetFixedPosition(115, 691, 150).SetFontSize(10).SetFont(font));
                // Invoice Date
                document.Add(new Paragraph(order.Date.ToString()).SetFixedPosition(115, 678, 150).SetFontSize(10).SetFont(font));
                // Due Date
                document.Add(new Paragraph(order.Date.AddDays(4).ToString()).SetFixedPosition(115, 665, 150).SetFontSize(10).SetFont(font));

                // Buyer 
                document.Add(new Paragraph(order.FirstName + " " + order.LastName).SetFixedPosition(372, 600, 150).SetFontSize(12).SetFont(font));
                // Address 
                document.Add(new Paragraph(order.Address).SetFixedPosition(405, 550, 150).SetFontSize(8).SetFont(font));
                // Phone
                document.Add(new Paragraph(order.Phone).SetFixedPosition(405, 501, 150).SetFontSize(9).SetFont(font));
                // Email:
                document.Add(new Paragraph(order.Email).SetFixedPosition(405, 489, 150).SetFontSize(9).SetFont(font));

                var index = 1;
                foreach (var product in order.ProductsOrders)
                {
                    int productX = 400 - (index - 1) * 22;

                    // Pos
                    document.Add(new Paragraph(index.ToString()).SetFixedPosition(25, productX, 50).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));
                    // Description
                    document.Add(new Paragraph(product.ProductProduct.Name_EN).SetFixedPosition(77, productX, 215).SetPaddingLeft(5).SetTextAlignment(TextAlignment.LEFT).SetFontSize(10).SetFont(font));
                    // Quantity
                    document.Add(new Paragraph(product.Amount.ToString()).SetFixedPosition(336, productX, 90).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));
                    // Price
                    document.Add(new Paragraph(product.ProductPrice.ToString() + " " + order.Currency).SetFixedPosition(426, productX, 79).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));
                    // Total
                    document.Add(new Paragraph((product.ProductPrice * product.Amount).ToString() + " " + order.Currency).SetFixedPosition(504, productX, 88).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));

                    index++;                 
                }

                // Subtotal
                document.Add(new Paragraph(order.Subtotal.ToString() + " " + order.Currency).SetFixedPosition(504, 113, 88).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));
                // Sales tax
                document.Add(new Paragraph("19%").SetFixedPosition(448, 90, 88).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));
                // Sales
                var procent = 0.19 * order.Subtotal;
                procent = (double)System.Math.Round(procent, 2);
                document.Add(new Paragraph(procent.ToString() + " " + order.Currency).SetFixedPosition(504, 90, 88).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));
                // Shipping
                document.Add(new Paragraph(order.Shipping.ToString() + " " + order.Currency).SetFixedPosition(504, 67, 88).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));
                // Total
                document.Add(new Paragraph((order.Subtotal + order.Shipping).ToString() + " " + order.Currency).SetFixedPosition(504, 44, 88).SetTextAlignment(TextAlignment.CENTER).SetFontSize(10).SetFont(font));

                document.Close();

                return new MemoryStream(stream.ToArray());
            }
            catch (Exception e)
            {
                return null;
            }
        }        
    }
}