using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;
using SistemaApoyo.BLL.Servicios;

namespace WebApiApoyo.Controllers.Profesor
{
    [Route("API/[controller]")]
    [ApiController]

    public class ProfesorActividadController : ControllerBase
    {
        private readonly IProfesorActividad _profesorActividadService;
        private readonly ILogger<ProfesorActividadController> _logger;

        public ProfesorActividadController(IProfesorActividad profesorActividadService, ILogger<ProfesorActividadController> logger)
        {
            _profesorActividadService = profesorActividadService;
            _logger = logger;
        }

        [HttpGet("Lista Actividades")]
        public async Task<IActionResult> ListaActividades()
        {
            var rsp = new Response<List<ActividadDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _profesorActividadService.ConsultarActividad();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener la lista de las actividades.");
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
                rsp.value = await _profesorActividadService.ConsultarporNombre(nombre);
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
        public async Task<IActionResult> ListaActividadPorId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<ActividadDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _profesorActividadService.ObteneActividadrPorId(id);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el id de la actividad");
            }
            return Ok(rsp);
        }

        [HttpPost]
        [Route("Crear Actividad")]
        public async Task<IActionResult> CrearActividad([FromBody] ActividadDTO actividad)
        {
            var rsp = new Response<string>();
            try
            {
                rsp.status = true;
                var resultado = await _profesorActividadService.CrearActividad(actividad);
                rsp.value = "Actividad creada con éxito";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al guardar la actividad.");
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("Editar por ID")]
        public async Task<IActionResult> EditarActividad(int id, [FromBody] ActividadDTO actividad)
        {
            if (id != actividad.Idactividad)
            {
                return BadRequest("El ID de la actividad no coincide con el ID proporcionado.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _profesorActividadService.ActualizarActivdad(actividad);
                rsp.status = true;
                rsp.value = "Actividad actualizada con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar la actividad.");
            }
            return Ok(rsp);
        }

        [HttpDelete]
        [Route("Eliminar Actividad")]
        public async Task<IActionResult> EliminarActividad(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<string>();

            try
            {
                var eli = await _profesorActividadService.EliminarActividad(id);
                rsp.status = true;
                rsp.value = "Se elimino la actividad con exito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al eliminar la actividad");
            }
            return Ok(rsp);
        }
    }
}