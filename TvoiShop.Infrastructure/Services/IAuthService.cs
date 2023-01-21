using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Infrastructure.Auth;
using TvoiShop.Infrastructure.DTO;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Services
{
    public interface IAuthService
    {
        public Task<IdentityResult> RegisterAsync(UserModel newUser);
        public Task<SignInResult> LoginAsync(UserModel user, bool rememberMe = false);
        public ApplicationUser? GetUserOrNULL(string email);
        public UserTokens GetTokenOrEmpty(UserModel userModel);
    }
}
