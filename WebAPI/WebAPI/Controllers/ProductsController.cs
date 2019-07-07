using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly GHContext _context;

        public ProductsController(GHContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDetails>>> GetProducts()
        {
            List<ProductDetails> response = new List<ProductDetails>();
            var productList = await _context.Products.ToListAsync();

            foreach (var product in productList)
            {
                var productsImages = _context.ProductsImages.FirstOrDefault(m => m.ProductId == product.ProductId);
                MemoryStream ms = new MemoryStream(productsImages.Data);
                response.Add(new ProductDetails
                {
                    ProductId = product.ProductId,
                    Price = product.Price,
                    Description = product.Description,
                    Name = product.Name,
                    Image = new FileStreamResult(ms, productsImages.ContentType)
                });

            }

            return response;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(int id, Products products)
        {
            if (id != products.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

            return NoContent();
        }

        // POST: api/Products
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Products>> PostProducts([FromForm]AddProduct product)
        {
            _context.Products.Add(new Products {
                ProductId = product.ProductId,
                Price = product.Price,
                Description = product.Description,
                Name = product.Name
            });

            MemoryStream ms = new MemoryStream();
            product.Image.OpenReadStream().CopyTo(ms);

            System.Drawing.Image image = System.Drawing.Image.FromStream(ms);

            ProductsImages imageEntity = new ProductsImages()
            {
                Id = Guid.NewGuid(),
                Name = Encoding.ASCII.GetBytes(product.Image.Name),
                Data = ms.ToArray(),
                Width = image.Width,
                Height = image.Height,
                ContentType = product.Image.ContentType,
                ProductId = product.ProductId
            };

            _context.ProductsImages.Add(imageEntity);

            _context.SaveChanges();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductsExists(product.ProductId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProducts", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Products>> DeleteProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            _context.Products.Remove(products);
            await _context.SaveChangesAsync();

            return products;
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
