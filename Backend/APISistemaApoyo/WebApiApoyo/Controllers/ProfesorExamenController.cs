using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.Extensions.Logging;

namespace WebApiApoyo.Controllers
{
    [Route("api/profesor-examen")]
    [ApiController]
    public class ProfesorExamenController : ControllerBase
    {
        private readonly IProfesorExamen _profesorExamen;
        private readonly ILogger<ProfesorExamenController> _logger;

        public ProfesorExamenController(IProfesorExamen profesorExamen, ILogger<ProfesorExamenController> logger)
        {
            _profesorExamen = profesorExamen;
            _logger = logger;
        }

        [HttpGet("lista-examenes")]
        public async Task<IActionResult> ListaExamenes()
        {
            var rsp = new Response<List<ExamenDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _profesorExamen.ConsultarExamen();
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener los exámenes.");
                rsp.status = false;
                rsp.msg = "Ocurrió un error al obtener los exámenes.";
                return StatusCode(500, rsp);
            }
        }

        [HttpGet("buscar-por-titulo")]
        public async Task<IActionResult> ListaExamenPorTitulo([FromQuery] string titulo)
        {
            if (string.IsNullOrWhiteSpace(titulo))
            {
                return BadRequest(new Response<List<ExamenDTO>>
                {
                    status = false,
                    msg = "El título no es válido."
                });
            }

            var rsp = new Response<List<ExamenDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _profesorExamen.ConsultarPorTitulo(titulo);
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el examen por título.");
                rsp.status = false;
                rsp.msg = "Ocurrió un error al obtener el examen.";
                return StatusCode(500, rsp);
            }
        }

        [HttpGet("examen/{id:int}")]
        public async Task<IActionResult> ListaExamenPorId(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new Response<ExamenDTO>
                {
                    status = false,
                    msg = "El ID proporcionado no es válido."
                });
            }

            var rsp = new Response<ExamenDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _profesorExamen.ObteneExamenrPorId(id);
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el examen por ID.");
                rsp.status = false;
                rsp.msg = "Ocurrió un error al obtener el examen.";
                return StatusCode(500, rsp);
            }
        }

        [HttpPost("crear-examen")]
        public async Task<IActionResult> CrearExamen([FromBody] ExamenDTO examen)
        {
            if (examen == null)
            {
                return BadRequest(new Response<string>
                {
                    status = false,
                    msg = "Los datos del examen no pueden ser nulos."
                });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new Response<string>
                {
                    status = false,
                    msg = "El modelo enviado no es válido."
                });
            }

            var rsp = new Response<string>();
            try
            {
                await _profesorExamen.CrearExamen(examen);
                rsp.status = true;
                rsp.value = "Examen creado con éxito.";
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al guardar el examen.");
                rsp.status = false;
                rsp.msg = "Ocurrió un error al guardar el examen.";
                return StatusCode(500, rsp);
            }
        }

        [HttpPut("editar-examen/{id:int}")]
        public async Task<IActionResult> EditarExamen(int id, [FromBody] ExamenDTO examen)
        {
            if (id <= 0)
            {
                return BadRequest(new Response<string>
                {
                    status = false,
                    msg = "ID de examen no válido."
                });
            }

            if (id != examen.Idexamen)
            {
                return BadRequest(new Response<string>
                {
                    status = false,
                    msg = "El ID del examen no coincide con el ID proporcionado."
                });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new Response<string>
                {
                    status = false,
                    msg = "El modelo enviado no es válido."
                });
            }

            var rsp = new Response<string>();
            try
            {
                var existeExamen = await _profesorExamen.ObteneExamenrPorId(id);
                if (existeExamen == null)
                {
                    return NotFound(new Response<string>
                    {
                        status = false,
                        msg = "El examen no existe."
                    });
                }

                await _profesorExamen.ActualizarExamen(examen);
                rsp.status = true;
                rsp.value = "Examen actualizado con éxito.";
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar el examen.");
                rsp.status = false;
                rsp.msg = "Ocurrió un error al actualizar el examen.";
                return StatusCode(500, rsp);
            }
        }

        [HttpDelete("eliminar-examen/{id:int}")]
        public async Task<IActionResult> EliminarExamen(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new Response<string>
                {
                    status = false,
                    msg = "ID de examen no válido."
                });
            }

            var rsp = new Response<string>();
            try
            {
                await _profesorExamen.EliminarExamen(id);
                rsp.status = true;
                rsp.value = "Examen eliminado con éxito.";
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar el examen.");
                rsp.status = false;
                rsp.msg = "Ocurrió un error al eliminar el examen.";
                return StatusCode(500, rsp);
            }
        }
    }
}