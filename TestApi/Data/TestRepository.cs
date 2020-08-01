using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using TestApi.Entities;

namespace TestApi.Data
{
    public interface IUserRepository
    {
        Task<User> GetUserAsync(string userName, string password);
        IQueryable<User> GetAllUsers();
        bool AddUser(User user);
        Task<bool> AddUserAsync(User user);
        bool UpdateUser(User user);
        Task<bool> UpdateUserAsync(User user);
        bool DeleteUser(string userId);
        Task<bool> DeleteUserAsync(string userId);
    }

    public class UserRepository : IUserRepository
    {
        private readonly TestDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        private readonly DbSet<User> _dbSet;

        public UserRepository(TestDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _dbSet = _dbContext.Set<User>();
        }

        public async Task<User> GetUserAsync(string userName, string password)
        {
            var user = _dbSet.FirstOrDefault(o => o.UserName == userName); // Checking username first
            if (user != null)
            {
                var passwordIsCorrect = await _userManager.CheckPasswordAsync(user, password); // Then, Checking Password 
                if (passwordIsCorrect)
                    return user;
            }
            return null;
        }

        public IQueryable<User> GetAllUsers() => _dbSet.AsNoTracking();

        public bool AddUser(User user)
        {
            if (user == null)
                return false;

            _dbSet.Add(user);
            return true;
        }

        public async Task<bool> AddUserAsync(User user)
        {
            if (user == null)
                return false;

            var result = await _userManager.CreateAsync(user, user.Password);
            return result.Succeeded;
        }

        public bool UpdateUser(User user)
        {
            var testUser = _dbSet.Find(user.Id);
            if (testUser == null)
                return false;

            testUser.UserName = user.UserName;
            testUser.Password = user.Password;
            testUser.FullName = user.FullName;
            testUser.Age = user.Age;
            testUser.Gender = user.Gender;
            testUser.BirthDate = user.BirthDate;
            
            _dbSet.Attach(testUser);
            _dbContext.Entry(testUser).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return true;
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            var testUser = _dbSet.Find(user.Id);
            if (testUser == null)
                return false;

            testUser.FullName = user.FullName;
            testUser.Age = user.Age;
            testUser.Gender = user.Gender;
            testUser.BirthDate = user.BirthDate;

            var result = await _userManager.UpdateAsync(testUser);
            return result.Succeeded;
        }

        public bool DeleteUser(string userId)
        {
            var testUser = _dbSet.Find(userId);
            if (testUser == null)
                return false;

            _dbSet.Attach(testUser);
            _dbSet.Remove(testUser);
            _dbContext.SaveChanges();
            return true;
        }

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var testUser = _dbSet.Find(userId);
            if (testUser == null)
                return false;

            var result = await _userManager.DeleteAsync(testUser);
            return result.Succeeded;
        }
    }
}
