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
            return _dbContext.Products
                .Include(p => p.Images)
                .Include(p => p.Colors)
                .Include(p => p.Sizes)
                .ToListAsync();
        }

        public void AddProduct(Product item)
        {
            _dbContext.Products.Add(item);
            _dbContext.SaveChanges();
        }

        public void DeleteProductById(Guid id)
        {
            var itemToRemove = _dbContext.Products.FirstOrDefault(p => p.Id == id);
            if (itemToRemove == null)
            {
                return;
            }
            _dbContext.Products.Remove(itemToRemove);
            _dbContext.SaveChanges();
        }

        public void UpdateProduct(Product item)
        {
            var itemToUpdate = _dbContext.Products.FirstOrDefault(p => p.Id == item.Id);
            if (itemToUpdate == null)
            {
                return;
            }
            itemToUpdate.Images = item.Images;
            itemToUpdate.Colors = item.Colors;
            itemToUpdate.Sizes = item.Sizes;
            _dbContext.Entry(itemToUpdate).CurrentValues.SetValues(item);
            _dbContext.SaveChanges();
        }
    }
}
