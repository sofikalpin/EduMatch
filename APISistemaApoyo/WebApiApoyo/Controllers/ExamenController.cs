using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;


namespace WebApiApoyo.Controllers
{


    [Route("API/[controller]")]
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

        [HttpGet]
        [Route("Lista Examenes")]
        public async Task<IActionResult> ListarExamenes()
        {
            var rsp = new Response<List<ExamenDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _examenService.ConsultarExamen();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener los examenes.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Titulo Examen")]
        public async Task<IActionResult> ListaExamenPorTitulo(string titulo)
        {
            if (string.IsNullOrWhiteSpace(titulo))
            {
                return BadRequest("El titulo no es valido");
            }

            var rsp = new Response<List<ExamenDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _examenService.ConsultarPorTitulo(titulo);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el titulo del examen.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route ("Examen ID")]
        public async Task<IActionResult> ListaExamenPorId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es valido.");
            }

            var rsp = new Response<ExamenDTO>();

            try
            {
                rsp.status = true;
                rsp.value = await _examenService.ObteneExamenrPorId(id);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el id del examen");
            }
            return Ok(rsp);
        }
    }
}