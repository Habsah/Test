using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TestApi.Data;
using TestApi.Entities;
using TestApi.Helpers;

namespace TestApi.Services
{
    public interface IUserService
    {
        Task<User> GetUserAsync(string userName, string password);
        User GetUser(string id);
        IQueryable<User> GetAllUsers();
        bool AddUser(User user);
        Task<bool> AddUserAsync(User user);
        bool UpdateUser(User user);
        Task<bool> UpdateUserAsync(User user);
        bool DeleteUser(string userId);
        Task<bool> DeleteUserAsync(string userId);
    }

    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IOptions<AppSettings> _appSettings;

        public UserService(IUserRepository userRepository, IOptions<AppSettings> appSettings)
        {
            _userRepository = userRepository;
            _appSettings = appSettings;
        }

        public async Task<User> GetUserAsync(string userName, string password)
        {
            var defaultUserAdded = await addDefaultTestUserAsync();
            if (defaultUserAdded)
            {
                var testUser = await _userRepository.GetUserAsync(userName, password);
                if (testUser == null) 
                    return null;

                testUser.Token = generateJwtToken(testUser);

                return testUser;
            }
            return null;
        }
        public User GetUser(string id) => GetAllUsers().FirstOrDefault(o => o.Id == id);
        
        public IQueryable<User> GetAllUsers() => _userRepository.GetAllUsers();

        public bool AddUser(User user) => _userRepository.AddUser(user);
        public async Task<bool> AddUserAsync(User user) => await _userRepository.AddUserAsync(user);

        public bool UpdateUser(User user) => _userRepository.UpdateUser(user);
        public Task<bool> UpdateUserAsync(User user) => _userRepository.UpdateUserAsync(user);

        public bool DeleteUser(string userId) => _userRepository.DeleteUser(userId);
        public Task<bool> DeleteUserAsync(string userId) => _userRepository.DeleteUserAsync(userId);

        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Value.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<bool> addDefaultTestUserAsync()
        {
            if (!GetAllUsers().Any())
                return await _userRepository.AddUserAsync(new User 
                { 
                    UserName = "Test", 
                    Password = "Test$123", 
                    FullName = "عبدالرحمن علاء الدين", 
                    Age = 27, 
                    BirthDate = new DateTime(1992, 7, 10), 
                    Gender = Enums.Genders.Male 
                });
            else
                return true;
        }
    }
}
