using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Models.Extended;
using TvoiShop.Telegram.Bot;

namespace TvoiShop.Infrastructure.Services.Implementations
{
    public class OrderService
    {
        private readonly BotManager _manager;
        public OrderService(BotManager manager)
        {
            _manager = manager;
        }

        public async Task ProceedOrder(Order order)
        {
            await _manager.SendMessage(FormatOrder(order));
        }

        private string FormatOrder(Order order)
        {
            var message = $"Phone Number: {order.Phone} + {order.ContactType} \n" +
                "________\n";

            order.Products.ForEach(p =>
            {
                message += $"Name: {p.LabelName} \n" +
                    $"Color: {p.Color} \n" +
                    $"Size: {p.Size} \n" +
                    $"Count: {p.Count} pcs \n" +
                    $"Saleprice: {p.SalePrice} UAH\n" +
                    $"Price: {p.Price} UAH\n" +
                    $"******************** \n";
            });

            if (order.Products.Count > 0) {
                message += $"Total price: {order.Products.Sum(p => p.SalePrice > 0 ? p.SalePrice : p.Price)} UAH\n";
            }

            return message;
        }
    }
}
