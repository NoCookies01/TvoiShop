using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Repositories
{
    public interface IProductsRepository
    {
        public Task<List<Product>> GetAll();
        public void AddProduct(Product item);
        public void DeleteProductById(Guid id);
        public void UpdateProduct(Product item);
    }
}
