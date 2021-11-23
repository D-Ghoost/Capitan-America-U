using System;

namespace CapitanAmericaBackend.models
{
    public class BaseEntity : Base
    {
        public string Name { get; set; }
        public string Home { get; set; }
        public string Nationality { get; set; }
    }
}