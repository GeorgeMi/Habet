using DTOs.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.DataBaseContext
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<Item> TodoItems { get; set; }
    }
}
