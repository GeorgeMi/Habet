using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsOrdersController : ControllerBase
    {
        private readonly GHContext _context;

        public ProductsOrdersController(GHContext context)
        {
            _context = context;
        }

        // GET: api/ProductsOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductsOrders>>> GetProductsOrders()
        {
            return await _context.ProductsOrders.ToListAsync();
        }

        // GET: api/ProductsOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductsOrders>> GetProductsOrders(int id)
        {
            var productsOrders = await _context.ProductsOrders.FindAsync(id);

            if (productsOrders == null)
            {
                return NotFound();
            }

            return productsOrders;
        }

        // PUT: api/ProductsOrders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductsOrders(int id, ProductsOrders productsOrders)
        {
            if (id != productsOrders.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(productsOrders).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsOrdersExists(id))
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

        // POST: api/ProductsOrders
        [HttpPost]
        public async Task<ActionResult<ProductsOrders>> PostProductsOrders(ProductsOrders productsOrders)
        {
            _context.ProductsOrders.Add(productsOrders);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductsOrdersExists(productsOrders.ProductId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductsOrders", new { id = productsOrders.ProductId }, productsOrders);
        }

        // DELETE: api/ProductsOrders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductsOrders>> DeleteProductsOrders(int id)
        {
            var productsOrders = await _context.ProductsOrders.FindAsync(id);
            if (productsOrders == null)
            {
                return NotFound();
            }

            _context.ProductsOrders.Remove(productsOrders);
            await _context.SaveChangesAsync();

            return productsOrders;
        }

        private bool ProductsOrdersExists(int id)
        {
            return _context.ProductsOrders.Any(e => e.ProductId == id);
        }
    }
}
