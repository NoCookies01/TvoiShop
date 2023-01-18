using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TvoiShop.Infrastructure.Services;
using TvoiShop.Infrastructure.Services.Implementations;
using TvoiShop.Models;
using TvoiShop.Models.Extended;

namespace TvoiShop.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task ProceedOrder(Order order)
        {
            await _orderService.ProceedOrder(order);
        }
    }
}
