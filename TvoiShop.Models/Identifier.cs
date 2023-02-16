using Reinforced.Typings.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TvoiShop.Models
{
    [TsInterface(IncludeNamespace = false)]
    public class Identifier
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [TsProperty(Type = "string")]
        public Guid Id { get; set; } = Guid.Empty;
    }
}
