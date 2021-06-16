namespace Api.Models
{
    public partial class ProductsOrders
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public double ProductPrice { get; set; }
        public int Amount { get; set; }
        public string Currency { get; set; }
        public int ProductId { get; set; }
        public string Code { get; set; }

        public virtual Orders Order { get; set; }
        public virtual Products ProductProduct { get; set; }
    }
}
