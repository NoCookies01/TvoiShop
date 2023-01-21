using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using TvoiShop.Models;
using Microsoft.Owin.Security;
using System.Net.Http;
using System.Threading;
using TvoiShop.Infrastructure.DTO;
using TvoiShop.Infrastructure.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using TvoiShop.Infrastructure.Auth;
using Microsoft.AspNetCore.Authorization;

namespace TvoiShop.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _configuration = configuration;
        }

        [Authorize]
        [HttpPost]
        public Task<IdentityResult> Register(UserModel newUser)
        {
            return _authService.RegisterAsync(newUser);
        }

        [HttpPost]
        public async Task<object> Login(UserModel userModel)
        {
            var result = await _authService.LoginAsync(userModel);
            object token = null;
            if (result.Succeeded)
            {
                token = _authService.GetTokenOrEmpty(userModel);
            }
            var ans = new { Result = result, Token = token };
            return ans;
        }

        [HttpPost]
        public Task<IdentityResult> RegisterFirstAdmin()
        {
            UserModel newUser = new UserModel()
            {
                Name = _configuration["Admin:Name"],
                Password = _configuration["Admin:Password"]
            };
            return _authService.RegisterAsync(newUser);
        }
    }
}
