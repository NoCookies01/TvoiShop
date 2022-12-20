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

namespace TvoiShop.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public Task<IdentityResult> Register(UserModel newUser)
        {
            return _authService.RegisterAsync(newUser);
        }

        [HttpPost]
        public Task<Microsoft.AspNetCore.Identity.SignInResult> Login(UserModel user)
        {
            return _authService.LoginAsync(user);
        }
    }
}
