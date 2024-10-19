using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;


namespace WebApiApoyo.Controllers
{



    [Route("API/[controller]")]
    [ApiController]
    public class RespuestaController : ControllerBase
    {
        private readonly IRespuestaService _respuestaService;
        private readonly ILogger<RespuestaController> _logger;

        public RespuestaController(IRespuestaService respuestaService, ILogger<RespuestaController> logger)
        {
            _respuestaService = respuestaService;
            _logger = logger;
        }
        [HttpGet]
        [Route("Lista Respuestas")]
        public async Task<IActionResult> ListarRespuestas()
        {
            var rsp = new Response<List<RespuestaDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _respuestaService.ConsultarRespuesta()
;            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener las respuestas.");
            }
            return Ok(rsp);
        }

       

        [HttpGet]
        [Route("Respuesta ID")]
        public async Task<IActionResult> ListaRespuestaPorId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es valido.");
            }

            var rsp = new Response<RespuestaDTO>();

            try
            {
                rsp.status = true;
                rsp.value = await _respuestaService.ObteneRespuestarPorId(id);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el id de la respuesta");
            }
            return Ok(rsp);
        }
        [HttpPost]
        [Route("Crear Respuesta")]
        public async Task<IActionResult> CrearRespuesta([FromBody] RespuestaDTO respuesta)
        {
            var rsp = new Response<string>();
            try
            {
                rsp.status = true;
                var resultado = await _respuestaService.CrearRespuesta(respuesta);
                rsp.value = "Respuesta creada con éxito";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al guardar la respuesta.");
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("Editar por ID")]
        public async Task<IActionResult> EditarActividad(int id, [FromBody] RespuestaDTO respuesta)
        {
            if (id != respuesta.Idrespuesta)
            {
                return BadRequest("El ID de la respuesta no coincide con el ID proporcionado.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _respuestaService.ActualizarRespuesta(respuesta);
                rsp.status = true;
                rsp.value = "Respuesta actualizada con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar la respuesta.");
            }
            return Ok(rsp);
        }
        [HttpDelete]
        [Route("Eliminar Respuesta")]
        public async Task<IActionResult> EliminarRespuesta(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<string>();

            try
            {
                var eli = await _respuestaService.EliminarRespuesta(id);
                rsp.status = true;
                rsp.value = "Se elimino la respuesta con exito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al eliminar la respuesta");
            }
            return Ok(rsp);
        }
    }


}