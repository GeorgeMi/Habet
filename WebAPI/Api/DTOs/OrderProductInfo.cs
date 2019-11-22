namespace Api.DTOs
{
    public class OrderProductInfo
    {
        public int ProductId { get; set; }
        public int Amount { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
    }
}