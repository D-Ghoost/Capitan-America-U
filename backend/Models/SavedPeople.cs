using System;

namespace CapitanAmericaBackend.models
{
    public class SavedPeople : BaseEntity
    {
        public DateTime SavedDate { get; set; }
        public string SavedPlace { get; set; }
    }
}