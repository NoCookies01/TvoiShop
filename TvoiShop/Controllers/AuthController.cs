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

        [HttpPost]
        public Task<IdentityResult> Register(UserModel newUser)
        {
            return _authService.RegisterAsync(newUser);
        }

        [HttpPost]
        public async Task</*Microsoft.AspNetCore.Identity.SignInResult*/ object> Login(UserModel userModel)
        {
            return new { Result = await _authService.LoginAsync(userModel), token = _authService .GetTokenOrEmpty(userModel)};
        }
    }
}
