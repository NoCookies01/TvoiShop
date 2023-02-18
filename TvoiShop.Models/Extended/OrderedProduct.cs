using Reinforced.Typings.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#nullable disable

namespace TvoiShop.Models.Extended
{
    [TsInterface(IncludeNamespace = false)]
    public class OrderedProduct: Product
    {
        public string Size { get; set; }
        public string Color { get; set; }
    }
}
