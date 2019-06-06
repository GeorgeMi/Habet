using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsImagesController : ControllerBase
    {
        private readonly GHContext _context;

        public ProductsImagesController(GHContext context)
        {
            _context = context;
        }

        // GET: api/ProductsImages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductsImages>>> GetProductsImages()
        {
            return await _context.ProductsImages.ToListAsync();
        }

        // GET: api/ProductsImages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductsImages>> GetProductsImages(int id)
        {
            var productsImages = await _context.ProductsImages.FindAsync(id);

            if (productsImages == null)
            {
                return NotFound();
            }

            return productsImages;
        }

        // PUT: api/ProductsImages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductsImages(int id, ProductsImages productsImages)
        {
            if (id != productsImages.ProductImageId)
            {
                return BadRequest();
            }

            _context.Entry(productsImages).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsImagesExists(id))
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

        // POST: api/ProductsImages
        [HttpPost]
        public async Task<ActionResult<ProductsImages>> PostProductsImages(ProductsImages productsImages)
        {
            _context.ProductsImages.Add(productsImages);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductsImagesExists(productsImages.ProductImageId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductsImages", new { id = productsImages.ProductImageId }, productsImages);
        }

        // DELETE: api/ProductsImages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductsImages>> DeleteProductsImages(int id)
        {
            var productsImages = await _context.ProductsImages.FindAsync(id);
            if (productsImages == null)
            {
                return NotFound();
            }

            _context.ProductsImages.Remove(productsImages);
            await _context.SaveChangesAsync();

            return productsImages;
        }

        private bool ProductsImagesExists(int id)
        {
            return _context.ProductsImages.Any(e => e.ProductImageId == id);
        }
    }
}
