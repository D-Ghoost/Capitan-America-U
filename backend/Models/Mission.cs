using System;

namespace CapitanAmericaBackend.models
{
    public class Mission : Base
    {
        public DateTime MissionDate { get; set; }
        public string Place { get; set; }
        public string Description { get; set; }
    }
}