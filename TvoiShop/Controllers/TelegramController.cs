using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TvoiShop.Infrastructure.Services;
using TvoiShop.Infrastructure.Services.Implementations;
using TvoiShop.Models;
using TvoiShop.Telegram.Bot;

namespace TvoiShop.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TelegramController : ControllerBase
    {
        private readonly BotManager _botManager;

        public TelegramController(BotManager botManager)
        {
            _botManager = botManager;
        }

        [HttpPost]
        public async Task<bool> Login(string code = "")
        {
            return await _botManager.LoginWith(code);
        }
    }
}
