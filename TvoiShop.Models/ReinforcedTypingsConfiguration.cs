using Reinforced.Typings.Fluent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TvoiShop.Models
{
    public class ReinforcedTypingsConfiguration
    {
        public static void Configure(ConfigurationBuilder builder)
        {
            builder.Global(config => config.CamelCaseForProperties()
                               .AutoOptionalProperties());
        }
    }
}
