using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;
using SistemaApoyo.BLL.Servicios;

namespace WebApiApoyo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfeExamenController : ControllerBase
    {
        private readonly IProfesorExamen _profesorExamen;
        private readonly ILogger<ProfeExamenController> _logger;

        public ProfeExamenController(IProfesorExamen profesorExamen, ILogger<ProfeExamenController> logger)
        {
            _profesorExamen = profesorExamen;
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
                rsp.value = await _profesorExamen.ConsultarExamen();
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
                rsp.value = await _profesorExamen.ConsultarPorTitulo(titulo);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el titulo del examen.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Examen ID")]
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
                rsp.value = await _profesorExamen.ObteneExamenrPorId(id);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el id del examen");
            }
            return Ok(rsp);
        }
        [HttpPost]
        [Route("Crear Examen")]
        public async Task<IActionResult> CrearExamen([FromBody] ExamenDTO examen)
        {
            var rsp = new Response<string>();
            try
            {
                rsp.status = true;
                var resultado = await _profesorExamen.CrearExamen(examen);
                rsp.value = "Examen creado con éxito";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al guardar el examen.");
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("Editar por ID")]
        public async Task<IActionResult> EditarActividad(int id, [FromBody] ExamenDTO examen)
        {
            if (id != examen.Idexamen)
            {
                return BadRequest("El ID del examen no coincide con el ID proporcionado.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _profesorExamen.ActualizarExamen(examen);
                rsp.status = true;
                rsp.value = "Examen actualizado con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar el examen.");
            }
            return Ok(rsp);
        }
        [HttpDelete]
        [Route("Eliminar Examen")]
        public async Task<IActionResult> EliminarExamen(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<string>();

            try
            {
                var eli = await _profesorExamen.EliminarExamen(id);
                rsp.status = true;
                rsp.value = "Se elimino el examen con exito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al eliminar el examen");
            }
            return Ok(rsp);
        }

    }
}