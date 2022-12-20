using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
    }
}
