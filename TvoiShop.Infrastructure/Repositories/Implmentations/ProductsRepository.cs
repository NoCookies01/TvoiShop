using AutoMapper.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Infrastructure.Helpers;
using TvoiShop.Models;
using static System.Net.Mime.MediaTypeNames;

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

        public Product? GetProductById(Guid id)
        {
            return _dbContext.Products
                .Include(p => p.Images)
                .Include(p => p.Colors)
                .Include(p => p.Sizes)
                .FirstOrDefault(p => p.Id == id);
        }

        public void AddProduct(Product item)
        {
            _dbContext.Products.Add(item);
            _dbContext.SaveChanges();
        }

        public void DeleteProductById(Guid id)
        {
            var itemToRemove = GetProductById(id);
            if (itemToRemove == null)
            {
                return;
            }
            _dbContext.RemoveRange(itemToRemove.Sizes);
            _dbContext.RemoveRange(itemToRemove.Images);
            _dbContext.RemoveRange(itemToRemove.Colors);
            
            _dbContext.Products.Remove(itemToRemove);

            _dbContext.SaveChanges();
        }

        public void UpdateProduct(Product item)
        {
            var itemToUpdate = GetProductById(item.Id);
            if (itemToUpdate == null)
            {
                return;
            }
            var colorsToDelete = itemToUpdate.Colors.Except(item.Colors, new ColorEqualityComparer());
            var colorsToAdd = item.Colors.Except(itemToUpdate.Colors, new ColorEqualityComparer());

            colorsToDelete.ForAll(c => itemToUpdate.Colors.Remove(c));
            colorsToAdd.ForAll(c => itemToUpdate.Colors.Add(c));

            var sizesToDelete = itemToUpdate.Sizes.Except(item.Sizes, new SizeEqualityComparer());
            var sizesToAdd = item.Sizes.Except(itemToUpdate.Sizes, new SizeEqualityComparer());

            sizesToDelete.ForAll(c => itemToUpdate.Sizes.Remove(c));
            sizesToAdd.ForAll(c => itemToUpdate.Sizes.Add(c));

            var imagesToDelete = itemToUpdate.Images.Except(item.Images, new ImageEqualityComparer());
            var imagesToAdd = item.Images.Except(itemToUpdate.Images, new ImageEqualityComparer());

            imagesToDelete.ForAll(c => itemToUpdate.Images.Remove(c));
            imagesToAdd.ForAll(c => itemToUpdate.Images.Add(c));

            _dbContext.Entry(itemToUpdate).CurrentValues.SetValues(item);

            _dbContext.SaveChanges();
        }
    }
}
