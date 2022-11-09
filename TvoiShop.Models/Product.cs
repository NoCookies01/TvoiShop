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
    public class Product
    {
        [TsProperty(Type = "string")]
        public Guid Id { get; set; }
        public int Count { get; set; }
        public string Collection { get; set; }
        public string Category { get; set; }
        public string LabelName { get; set; }
        public string Brand { get; set; }
        public float Price { get; set; }
        public float SalePrice { get; set; }
        public string Image { get; set; }
        public float Weight { get; set; }
        public string Color { get; set; }
        public string Metal { get; set; }
        public float Size { get; set; }
        public string Description { get; set; }
        public float Popularity { get; set; }
        public float CustomPopularity { get; set; }
    }
}
