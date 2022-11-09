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

        public void AddProduct(Product item)
        {
            _productsRepository.AddProduct(item);
        }
        public void DeleteProductById(Guid id)
        {
            _productsRepository.DeleteProductById(id);
        }
        public void UpdateProduct(Product item)
        {
            _productsRepository.UpdateProduct(item);
        }
    }
}
