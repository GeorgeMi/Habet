using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DTOs.Models;
using System;

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
        public async Task<ActionResult<IEnumerable<ProductInfo>>> GetProducts(int top, int from)
        {
            //var productList = await _context.Products.Skip(from).Take(top).ToListAsync();
            var productList = new List<Products>();
            Random rnd = new Random();
            for (int i = 0; i < 9; i++)
            {
                productList.Add(new Products { Name = "Name"+i, Price = i, ProductId = rnd.Next(1, 131231) });
            }

            List<ProductInfo> result = new List<ProductInfo>();
            foreach (var product in productList)
            {
                result.Add(new ProductInfo
                {
                    Name = product.Name,
                    Price = product.Price,
                    ProductId = product.ProductId,
                    Image = await ProductsImagesController.GetProductsImages(product.ProductId)
                });
            }

            return result; 
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            //var products = await _context.Products.FindAsync(id);

            //if (products == null)
            //{
            //    return NotFound();
            //}

            //return products;

            return new Products { Description = "Description" + id, Name = "Name" + id, Price = id, ProductId = id };
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
        public async Task<ActionResult<Products>> PostProducts(Products products)
        {
            _context.Products.Add(products);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductsExists(products.ProductId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProducts", new { id = products.ProductId }, products);
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
