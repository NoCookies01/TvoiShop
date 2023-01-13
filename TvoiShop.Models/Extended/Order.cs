using Reinforced.Typings.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TvoiShop.Models.Extended
{
    [TsInterface(IncludeNamespace = false)]
    public class Order
    {
        public List<OrderedProduct> Products { get; set; }
        public string Phone { get; set; }
        public string ContactType { get; set; }
    }
}
