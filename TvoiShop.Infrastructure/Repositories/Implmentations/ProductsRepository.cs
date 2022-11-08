using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Repositories.Implmentations
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly TvoiShopDBContext _dbContext;

        public ProductsRepository(TvoiShopDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<List<Product>> GetAll()
        {
            return _dbContext.Products.ToListAsync();
        }
    }
}
