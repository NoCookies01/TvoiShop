using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Infrastructure.Auth;
using TvoiShop.Infrastructure.DTO;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly JwtSettings _jwtSettings;

        public AuthService(
            UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager, 
            IConfiguration configuration, 
            JwtSettings jwtSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _jwtSettings = jwtSettings;
        }

        public Task<IdentityResult> RegisterAsync(UserModel newUser)
        {
            var user = new ApplicationUser()
            {
                UserName = newUser.Name,
                Email = newUser.Name
            };

            return _userManager.CreateAsync(user, newUser.Password);
        }

        public Task<SignInResult> LoginAsync(UserModel user, bool rememberMe = false)
        {
            return _signInManager.PasswordSignInAsync(user.Name, user.Password, rememberMe, false);
        }

        public ApplicationUser? GetUserOrNULL(string email)
        {
            return  _userManager.Users.FirstOrDefault(u => u.Email == email);
        }

        public UserTokens GetTokenOrEmpty(UserModel userModel)
        {
            var user = GetUserOrNULL(userModel.Name);
            if (user == null) return new UserTokens();
            var token = JwtHelpers.GenTokenkey(new UserTokens()
            {
                EmailId = user.Email,
                GuidId = Guid.NewGuid(),
                UserName = user.UserName,
                Id = user.Id,
            }, _jwtSettings);

            return token;
        }
    }
}
