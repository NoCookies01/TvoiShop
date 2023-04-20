using Reinforced.Typings.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#nullable disable

namespace TvoiShop.Models
{
    [TsInterface(IncludeNamespace = false)]
    public class Product: Identifier
    {
        public int Count { get; set; }
        public string Collection { get; set; }
        public string Category { get; set; }
        public string LabelName { get; set; }
        public string Brand { get; set; }
        public float Price { get; set; }
        public float SalePrice { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public float Weight { get; set; }
        public virtual ICollection<Color> Colors { get; set; }
        public string Metal { get; set; }
        public virtual ICollection<Size> Sizes { get; set; }
        public string Description { get; set; }
        public float Popularity { get; set; }
        public float CustomPopularity { get; set; }
        public string Packaging { get; set; }
    }
}
