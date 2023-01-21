using Reinforced.Typings.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TvoiShop.Models
{
    [TsInterface(IncludeNamespace = false)]
    public class UserTokens
    {
        [TsProperty(Type = "string")]
        public Guid GuidId { get; set; } = Guid.Empty;
        public string Token { get; set; } = "";
        public string UserName { get; set; } = "";
        public TimeSpan Validaty { get; set; } = TimeSpan.Zero;
        public string RefreshToken { get; set; } = "";
        public string Id { get; set; } = "";
        public string EmailId { get; set; } = "";
        public DateTime ExpiredTime { get; set; } = DateTime.MinValue;
    }
}
