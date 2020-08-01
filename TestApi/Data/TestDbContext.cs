using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TestApi.Entities;

namespace TestApi.Data
{
    public class TestDbContext : IdentityDbContext<User>
    {
        public TestDbContext(DbContextOptions<TestDbContext> options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}

