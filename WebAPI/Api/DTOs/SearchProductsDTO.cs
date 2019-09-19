namespace Api.DTOs
{
    public class SearchProductsDTO
    {
        public string Gender { get; set; }
        public string Type { get; set; }
        public int Top { get; set; }
        public int From { get; set; }
        public int PriceFrom { get; set; }
        public int PriceTo { get; set; }
        public string Lang { get; set; }
        public string Currency { get; set; }
    }
}