namespace PaymentOrchestrator.Lite.Api.Services;

public interface IPaymentService
{
    Task<Models.Payment> CreateAsync(string customerId, decimal amount);
    Task<IEnumerable<Models.Payment>> GetAllAsync();
    Task<Models.Payment> ConfirmAsync(Guid paymentId);
    Task<Models.Payment> GetByIdAsync(Guid id);
}