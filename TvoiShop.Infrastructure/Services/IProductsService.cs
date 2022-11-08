using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Services
{
    public interface IProductsService
    {
        public Task<List<Product>> GetAll();
    }
}
