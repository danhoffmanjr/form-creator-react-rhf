using System.Collections.Generic;

namespace Domain
{
    public class FormType : EntityBase
    {
        public string Title { get; set; }
        public string Fields { get; set; }
        public List<Report> Reports { get; set; }
    }
}
