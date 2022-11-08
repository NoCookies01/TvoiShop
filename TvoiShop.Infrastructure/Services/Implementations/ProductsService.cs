using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Infrastructure.Repositories;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Services.Implementations
{
    public class ProductsService : IProductsService
    {
        private readonly IProductsRepository _productsRepository;

        public ProductsService(IProductsRepository productsRepository)
        {
            _productsRepository = productsRepository;
        }

        public Task<List<Product>> GetAll()
        {
            return _productsRepository.GetAll();
        }
    }
}
