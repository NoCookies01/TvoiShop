using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Helpers
{
    public class ImageEqualityComparer : IEqualityComparer<Image>
    {
        public bool Equals(Image? x, Image? y)
        {
            if (x == null || y == null) return false;

            if (x.Url == y.Url) return true;

            return false;
        }

        public int GetHashCode([DisallowNull] Image obj)
        {
            return obj.GetHashCode();
        }
    }
}
