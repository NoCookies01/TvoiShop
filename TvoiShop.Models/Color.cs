using Reinforced.Typings.Attributes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

#nullable disable

namespace TvoiShop.Models
{
    [TsInterface(IncludeNamespace = false)]
    public class Color
    {
        [TsProperty(Type = "string")]
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}