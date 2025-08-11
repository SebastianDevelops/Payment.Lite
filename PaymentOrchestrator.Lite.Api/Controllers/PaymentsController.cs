using Microsoft.AspNetCore.Mvc;
using PaymentOrchestrator.Lite.Api.Dtos;
using PaymentOrchestrator.Lite.Api.Services;

namespace PaymentOrchestrator.Lite.Api.Controllers;

[ApiController]
[Route("")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _service;

    public PaymentsController(IPaymentService service)
    {
        _service = service;
    }

    [HttpPost("payments")]
    public async Task<IActionResult> Create([FromBody] PaymentCreateDto dto)
    {
        if (dto == null || string.IsNullOrWhiteSpace(dto.CustomerId) || dto.Amount <= 0)
            return BadRequest("Invalid payload");

        var payment = await _service.CreateAsync(dto.CustomerId, dto.Amount);
        return CreatedAtAction(nameof(GetAll), new { id = payment.Id }, payment);
    }

    [HttpGet("payments")]
    public async Task<IActionResult> GetAll()
    {
        var all = await _service.GetAllAsync();
        return Ok(all);
    }

    [HttpPost("simulate-confirmation/{paymentId:guid}")]
    public async Task<IActionResult> SimulateConfirmation([FromRoute] Guid paymentId)
    {
        var updated = await _service.ConfirmAsync(paymentId);
        if (updated == null) return NotFound();
        return Ok(updated);
    }
}