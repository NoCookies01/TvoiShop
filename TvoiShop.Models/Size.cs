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
    public class Size
    {
        [TsProperty(Type = "string")]
        public Guid Id { get; set; }
        public float Value { get; set; }
    }
}
