using System.Collections.Generic;

namespace CapitanAmericaBackend.models
{
    public class Super : BaseEntity
    {
        public string Description { get; set; }
        public bool IsAlly { get; set; }
        public bool IsEnemy { get; set; }
    }
}