namespace Domain
{
    public class Report : EntityBase
    {
        public string Title { get; set; }
        public Form Type { get; set; }
        public string Fields { get; set; }
    }
}