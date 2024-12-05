using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;

namespace WebApiApoyo.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class ProfesorArticuloController : ControllerBase
    {
        private readonly IProfesorArticulo _profesorArticuloService;
        private readonly ILogger<ProfesorArticuloController> _logger;

        public ProfesorArticuloController(IProfesorArticulo profesorArticuloService, ILogger<ProfesorArticuloController> logger)
        {
            _profesorArticuloService = profesorArticuloService;
            _logger = logger;
        }

        // Ruta modificada para evitar conflicto
        [HttpGet("ListaArticulos")]
        public async Task<IActionResult> ListaArticulos()
        {
            var rsp = new Response<List<ArticuloDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _profesorArticuloService.ConsultarArticulo();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener la lista de artículos.");
            }

            return Ok(rsp);
        }

        // Ruta modificada para evitar conflicto
        [HttpGet("TituloArticulo")]
        public async Task<IActionResult> ListaArticuloPorTitulo(string titulo)
        {
            if (string.IsNullOrWhiteSpace(titulo))
            {
                return BadRequest("El título no es válido.");
            }

            var rsp = new Response<List<ArticuloDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _profesorArticuloService.ConsultarporTitulo(titulo);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el título del artículo.");
            }
            return Ok(rsp);
        }

        
        [HttpGet("ArticuloPorId")]
        public async Task<IActionResult> ListaArticuloPorId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<ArticuloDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _profesorArticuloService.ObteneArticulorPorId(id);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el artículo por ID.");
            }
            return Ok(rsp);
        }

        [HttpPost("CrearArticulo")]
        public async Task<IActionResult> CrearArticulo([FromBody] ArticuloDTO articulo)
        {
            var rsp = new Response<string>();
            try
            {
                rsp.status = true;
                var resultado = await _profesorArticuloService.CrearArticulo(articulo);
                rsp.value = "Artículo creado con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al guardar el artículo.");
            }
            return Ok(rsp);
        }

        [HttpPut("EditarArticuloPorId")]
        public async Task<IActionResult> EditarArticulo(int id, [FromBody] ArticuloDTO articulo)
        {
            if (id != articulo.Idarticulo)
            {
                return BadRequest("El ID del artículo no coincide con el ID proporcionado.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _profesorArticuloService.ActualizarArticulo(articulo);
                rsp.status = true;
                rsp.value = "Artículo actualizado con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar el artículo.");
            }
            return Ok(rsp);
        }

        [HttpDelete("EliminarArticulo")]
        public async Task<IActionResult> EliminarArticulo(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<string>();

            try
            {
                var eli = await _profesorArticuloService.EliminarArticulo(id);
                rsp.status = true;
                rsp.value = "Artículo eliminado con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al eliminar el artículo.");
            }
            return Ok(rsp);
        }
    }
}
