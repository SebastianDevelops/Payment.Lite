using Microsoft.EntityFrameworkCore;
using PaymentOrchestrator.Lite.Api.Data;
using PaymentOrchestrator.Lite.Api.Models;

namespace PaymentOrchestrator.Lite.Api.Services;

public class PaymentService : IPaymentService
{
    private readonly PaymentsDbContext _db;

    public PaymentService(PaymentsDbContext db)
    {
        _db = db;
    }

    public async Task<Payment> CreateAsync(string customerId, decimal amount)
    {
        var payment = Payment.Create(customerId, amount);
        _db.Payments.Add(payment);
        await _db.SaveChangesAsync();
        return payment;
    }

    public async Task<IEnumerable<Payment>> GetAllAsync()
    {
        return await _db.Payments.OrderByDescending(p => p.CreatedAt).ToListAsync();
    }

    public async Task<Payment> GetByIdAsync(Guid id)
    {
        return await _db.Payments.FindAsync(id);
    }

    public async Task<Payment> ConfirmAsync(Guid paymentId)
    {
        var payment = await _db.Payments.FindAsync(paymentId);
        if (payment == null) return null;
        payment.UpdateStatus("Confirmed");
        _db.Payments.Update(payment);
        await _db.SaveChangesAsync();
        return payment;
    }
}
