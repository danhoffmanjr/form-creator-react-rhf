using System.Collections.Generic;

namespace Domain
{
    public class Form : EntityBase
    {
        public string Title { get; set; }
        public string Fields { get; set; }
        public List<Report> Reports { get; set; }
    }
}
