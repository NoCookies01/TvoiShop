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
using TvoiShop.Infrastructure.DTO;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
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

        public string GetTokenOrEmpty(UserModel userModel)
        {
            string result = "";
            if (userModel != null && userModel.Name != null && userModel.Password != null)
            {
                var user = GetUserOrNULL(userModel.Name);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("DisplayName", user.UserName),
                        new Claim("UserName", user.UserName),
                        new Claim("Email", user.Email)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(14),
                        signingCredentials: signIn);

                    result = new JwtSecurityTokenHandler().WriteToken(token);
                }
            }

            return result;
        }
    }
}
