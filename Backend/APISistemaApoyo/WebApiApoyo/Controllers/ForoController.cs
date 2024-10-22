using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;
using SistemaApoyo.BLL.Servicios;


namespace WebApiApoyo.Controllers
{

    [Route("API/[controller]")]
    [ApiController]
    public class ForoController : ControllerBase
    {
        private readonly IForoService _foroService;
        private readonly ILogger<ForoController> _logger;

        public ForoController(IForoService foroService, ILogger<ForoController> logger)
        {
            _foroService = foroService;
            _logger = logger;
        }

        [HttpGet]
        [Route("Listar Foros")]
        public async Task<IActionResult> ListaForos()
        {
            var rsp = new Response<List<ForoDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _foroService.ConsultarForos();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el foro.");
            }
            return Ok(rsp);
        }
        [HttpGet]
        [Route("Nombre Foro")]
        public async Task<IActionResult> ListaConsultaPorNombre(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
            {
                return BadRequest("El titulo no es válido.");
            }

            var rsp = new Response<List<ForoDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _foroService.ConsultarPorNombre(nombre);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el nombre del foro.");
            }
            return Ok(rsp);
        }


        [HttpGet]
        [Route("Foro ID")]
        public async Task<IActionResult> ListaForoPorId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<ForoDTO>();
            try
            {
                rsp.value = await _foroService.ObtenerForoPorId(id);

                rsp.status = true;
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el id del foro.");
            }
            return Ok(rsp);
        }


        [HttpPost]
        [Route("Crear Foro")]
        public async Task<IActionResult> CrearForo([FromBody] ForoDTO foro)
        {
            if (foro == null)
            {
                return BadRequest("Los datos del foro son inválidos.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _foroService.CrearForo(foro);
                rsp.status = true;
                rsp.value = "Foro creado con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al crear el foro.");
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("Editar por ID")]
        public async Task<IActionResult> EditarForo(int id, [FromBody] ForoDTO foro)
        {
            if (id != foro.Idforo)
            {
                return BadRequest("El ID del foro no coincide con el ID proporcionado.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _foroService.ActualizarForo(foro);
                rsp.status = true;
                rsp.value = "Foro actualizado con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar el foro.");
            }
            return Ok(rsp);
        }


    }
}
