using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersAddressesController : ControllerBase
    {
        private readonly GHContext _context;

        public UsersAddressesController(GHContext context)
        {
            _context = context;
        }

        // GET: api/UsersAddresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersAddresses>>> GetUsersAddresses()
        {
            return await _context.UsersAddresses.ToListAsync();
        }

        // GET: api/UsersAddresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsersAddresses>> GetUsersAddresses(int id)
        {
            var usersAddresses = await _context.UsersAddresses.FindAsync(id);

            if (usersAddresses == null)
            {
                return NotFound();
            }

            return usersAddresses;
        }

        // PUT: api/UsersAddresses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersAddresses(int id, UsersAddresses usersAddresses)
        {
            if (id != usersAddresses.UserAdressId)
            {
                return BadRequest();
            }

            _context.Entry(usersAddresses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersAddressesExists(id))
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

        // POST: api/UsersAddresses
        [HttpPost]
        public async Task<ActionResult<UsersAddresses>> PostUsersAddresses(UsersAddresses usersAddresses)
        {
            _context.UsersAddresses.Add(usersAddresses);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UsersAddressesExists(usersAddresses.UserAdressId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUsersAddresses", new { id = usersAddresses.UserAdressId }, usersAddresses);
        }

        // DELETE: api/UsersAddresses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UsersAddresses>> DeleteUsersAddresses(int id)
        {
            var usersAddresses = await _context.UsersAddresses.FindAsync(id);
            if (usersAddresses == null)
            {
                return NotFound();
            }

            _context.UsersAddresses.Remove(usersAddresses);
            await _context.SaveChangesAsync();

            return usersAddresses;
        }

        private bool UsersAddressesExists(int id)
        {
            return _context.UsersAddresses.Any(e => e.UserAdressId == id);
        }
    }
}
