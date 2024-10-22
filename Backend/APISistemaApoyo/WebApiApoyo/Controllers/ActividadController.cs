using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;


namespace WebApiApoyo.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class ActividadController : ControllerBase
    {
        private readonly IActividadService _actividadService;
        private readonly ILogger<ActividadController> _logger;

        public ActividadController(IActividadService actividadService, ILogger<ActividadController> logger)
        {
            _actividadService = actividadService;
            _logger = logger;
        }

        [HttpGet]
        [Route("Listar Actividad")]
        public async Task<IActionResult> ListaActividades()
        {
            var rsp = new Response<List<ActividadDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _actividadService.ConsultarActividad();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener las actividades.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Nombre Completo Actividad")]
        public async Task<IActionResult> ListaActividadPorNombre(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
            {
                return BadRequest("El nombre no es  válido.");
            }

            var rsp = new Response<List<ActividadDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _actividadService.ConsultarporNombre(nombre);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el nombre de la actividad.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Actividad ID")]
        public async Task<IActionResult> ListaActividadporId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<ActividadDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _actividadService.ObtenerPorId(id);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el id de la actividad");
            }
            return Ok(rsp);
        }



    }
}