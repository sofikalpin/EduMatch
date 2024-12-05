using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using System.ComponentModel.DataAnnotations;

[Route("api/examenes")]
[ApiController]
public class ExamenController : ControllerBase
{
    private readonly IExamenService _examenService;
    private readonly ILogger<ExamenController> _logger;

    public ExamenController(IExamenService examenService, ILogger<ExamenController> logger)
    {
        _examenService = examenService;
        _logger = logger;
    }

    [HttpGet("lista")]
    public Task<IActionResult> ListarExamenes()
    {
        return HandleRequest(() => _examenService.ConsultarExamen(), "Error al obtener los exámenes.");
    }

    [HttpGet("titulo")]
    public Task<IActionResult> ListaExamenPorTitulo([FromQuery][Required] string titulo)
    {
        return HandleRequest(() => _examenService.ConsultarPorTitulo(titulo), "Error al obtener el examen por título.");
    }

    [HttpGet("{id:int}")]
    public Task<IActionResult> ListaExamenPorId(int id)
    {
        if (id <= 0)
        {
            return Task.FromResult<IActionResult>(BadRequest("El ID proporcionado no es válido."));
        }
        return HandleRequest(() => _examenService.ObteneExamenrPorId(id), "Error al obtener el id");
    }

    private async Task<IActionResult> HandleRequest<T>(Func<Task<T>> action, string errorMessage)
    {
        var rsp = new Response<T>();
        try
        {
            rsp.status = true;
            rsp.value = await action();
            return Ok(rsp);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = errorMessage;
            _logger.LogError(ex, errorMessage);
            return StatusCode(500, rsp);
        }
    }
}
