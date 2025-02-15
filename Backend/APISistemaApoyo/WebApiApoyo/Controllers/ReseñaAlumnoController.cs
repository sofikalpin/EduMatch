using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.API.Utilidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiApoyo.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class ReseñaController : ControllerBase
    {
        private readonly IReseñaAlumnoService _reseñaService;
        private readonly ILogger<ReseñaController> _logger;

        public ReseñaController(IReseñaAlumnoService reseñaService, ILogger<ReseñaController> logger)
        {
            _reseñaService = reseñaService;
            _logger = logger;
        }

        [HttpGet("ListaReseñas")]
        public async Task<IActionResult> ObtenerTodas()
        {
            var rsp = new Response<List<ReseñaAlumnoDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = (await _reseñaService.ObtenerTodasAsync()).ToList();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener la lista de reseñas.");
            }
            return Ok(rsp);
        }

        [HttpGet("ReseñaPorId")]
        public async Task<IActionResult> ObtenerPorId(int id)
        {
            if (id <= 0)
                return BadRequest("El ID proporcionado no es válido.");

            var rsp = new Response<ReseñaAlumnoDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _reseñaService.ObtenerPorIdAsync(id);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener la reseña por ID.");
            }
            return Ok(rsp);
        }

        [HttpPost("CrearReseña")]
        public async Task<IActionResult> CrearReseña([FromBody] CrearReseñaAlumnoDTO nuevaReseña)
        {
            var rsp = new Response<string>();
            try
            {
                await _reseñaService.CrearAsync(nuevaReseña);
                rsp.status = true;
                rsp.value = "Reseña creada con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al crear la reseña.");
            }
            return Ok(rsp);
        }

        [HttpPut("ActualizarReseña")]
        public async Task<IActionResult> ActualizarReseña([FromBody] ReseñaAlumnoDTO reseñaDto)
        {
            var rsp = new Response<string>();
            try
            {
                await _reseñaService.ActualizarAsync(reseñaDto);
                rsp.status = true;
                rsp.value = "Reseña actualizada con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar la reseña.");
            }
            return Ok(rsp);
        }

        [HttpDelete("EliminarReseña")]
        public async Task<IActionResult> EliminarReseña(int id)
        {
            if (id <= 0)
                return BadRequest("El ID proporcionado no es válido.");

            var rsp = new Response<string>();
            try
            {
                await _reseñaService.EliminarAsync(id);
                rsp.status = true;
                rsp.value = "Reseña eliminada con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al eliminar la reseña.");
            }
            return Ok(rsp);
        }
    }
}
