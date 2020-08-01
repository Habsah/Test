using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestApi.Entities;
using TestApi.Services;

namespace TestApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync(User user)
        {
            var response = await _userService.GetUserAsync(user.UserName, user.Password);

            if (response == null)
                return BadRequest(new { message = "اسم المستخدم أو كلمة المرور غير صحيحين" });

            return Ok(response);
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddAsync(User user)
        {
            var errorMessage = "حدث خطأ ما! لم يتم تسجيل المستخدم";

            if (user != null)
            {
                var addSucceeded = await _userService.AddUserAsync(user);
                if (addSucceeded)
                    return Ok();
                else
                    return BadRequest(new { message = errorMessage });
            }

            return BadRequest(new { message = errorMessage });
        }

        [Authorize]
        [HttpPost("update")]
        public async Task<IActionResult> UpdateAsync(User user)
        {
            var errorMessage = "لم يتم تعديل بيانات المستخدم";

            if (user != null)
            {
                var updateSucceeded = await _userService.UpdateUserAsync(user);
                if (updateSucceeded)
                    return Ok();
                else
                    return BadRequest(new { message = errorMessage });
            }

            return BadRequest(new { message = errorMessage });
        }

        [Authorize]
        [HttpGet("delete")]
        public async Task<IActionResult> DeleteAsync(string userId)
        {
            var errorMessage = "لم يتم تعديل حذف المستخدم";

            var deleteSucceeded = await _userService.DeleteUserAsync(userId);
            if (deleteSucceeded)
                return Ok();
            else
                return BadRequest(new { message = errorMessage });
        }

        [Authorize]
        [HttpGet("users")]
        public List<User> GetAllUsers() => _userService.GetAllUsers().ToList();

        [Authorize]
        [HttpGet("user")]
        public User GetUser(string userId) => _userService.GetUser(userId);
    }
}