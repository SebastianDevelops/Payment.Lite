using Microsoft.EntityFrameworkCore;
using PaymentOrchestrator.Lite.Api.Data;
using PaymentOrchestrator.Lite.Api.Services;
using Xunit;
using Assert = NUnit.Framework.Assert;

namespace PaymentOrchestrator.Lite.Tests;

public class Tests
{
    [Fact]
    public async Task CreateAndConfirmPayment_Works()
    {
        var options = new DbContextOptionsBuilder<PaymentsDbContext>()
            .UseInMemoryDatabase(databaseName: "testdb").Options;

        using (var db = new PaymentsDbContext(options))
        {
            var svc = new PaymentService(db);
            var p = await svc.CreateAsync("cust-123", 100m);
            Assert.Equals("Pending", p.Status);

            var confirmed = await svc.ConfirmAsync(p.Id);
            Assert.Equals("Confirmed", confirmed.Status);
        }
    }
}