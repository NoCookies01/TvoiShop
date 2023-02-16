using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TvoiShop.Models;

namespace TvoiShop.Infrastructure.Helpers
{
    public class ColorEqualityComparer : IEqualityComparer<Color>
    {
        public bool Equals(Color? x, Color? y)
        {
            if (x == null || y == null) return false;

            if (x.Name == y.Name) return true;

            return false;
        }

        public int GetHashCode([DisallowNull] Color obj)
        {
            return obj.GetHashCode();
        }
    }
}
