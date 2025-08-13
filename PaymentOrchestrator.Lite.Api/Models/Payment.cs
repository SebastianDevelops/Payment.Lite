namespace PaymentOrchestrator.Lite.Api.Models;

public class Payment
{
    public Guid Id { get; private set; }
    public string CustomerId { get; private set; }
    public decimal Amount { get; private set; }
    public string Status { get; private set; }
    public DateTime CreatedAt { get; private set; }
    
    public static Payment Create(string customerId, decimal amount)
    {
        return new Payment
        {
            Id = Guid.NewGuid(),
            CustomerId = customerId,
            Amount = amount,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };
    }
    
    public void UpdateStatus(string status)
    {
        Status = status;
    }
}