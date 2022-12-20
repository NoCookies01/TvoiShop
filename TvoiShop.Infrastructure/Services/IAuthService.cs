using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Infrastructure.DTO;

namespace TvoiShop.Infrastructure.Services
{
    public interface IAuthService
    {
        public Task<IdentityResult> RegisterAsync(UserModel newUser);
        public Task<SignInResult> LoginAsync(UserModel user, bool rememberMe = false);
    }
}
