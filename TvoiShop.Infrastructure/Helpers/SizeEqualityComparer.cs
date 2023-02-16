using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Helpers
{
    public class SizeEqualityComparer : IEqualityComparer<Size>
    {
        public bool Equals(Size? x, Size? y)
        {
            if (x == null || y == null) return false;

            if (x.Value == y.Value) return true;

            return false;
        }

        public int GetHashCode([DisallowNull] Size obj)
        {
            return obj.GetHashCode();
        }
    }
}
