using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.API.Utilidad;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SistemaApoyo.API.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class ReseñaController : ControllerBase
    {
        private readonly IReseñaService _reseñaService;
        private readonly ILogger<ReseñaController> _logger;

        public ReseñaController(IReseñaService reseñaService, ILogger<ReseñaController> logger)
        {
            _reseñaService = reseñaService;
            _logger = logger;
        }

        [HttpPost]
        [Route("Crear")]
        public async Task<IActionResult> CrearReseña([FromBody] ReseñaDTO reseñaDTO)
        {
            var rsp = new Response<ReseñaRespuestaDTO>();
            try
            {
                rsp.status = true;
                rsp.value = await _reseñaService.CreateReview(reseñaDTO);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al crear la reseña.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Obtener/{id}")]
        public async Task<IActionResult> ObtenerReseña(int id)
        {
            var rsp = new Response<ReseñaRespuestaDTO>();
            try
            {
                rsp.value = await _reseñaService.GetReview(id);
                rsp.status = rsp.value != null;
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener la reseña.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> ListarReseñas()
        {
            var rsp = new Response<List<ReseñaRespuestaDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = (List<ReseñaRespuestaDTO>)await _reseñaService.GetAllReviews();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al listar las reseñas.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Usuario/{userId}")]
        public async Task<IActionResult> ListarReseñasPorUsuario(int userId)
        {
            var rsp = new Response<List<ReseñaRespuestaDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = (List<ReseñaRespuestaDTO>)await _reseñaService.GetUserReviews(userId);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener reseñas del usuario.");
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("Actualizar/{id}/{userId}")]
        public async Task<IActionResult> ActualizarReseña(int id, int userId, [FromBody] ReseñaDTO reseñaDTO)
        {
            var rsp = new Response<bool>();
            try
            {
                rsp.status = await _reseñaService.UpdateReview(id, userId, reseñaDTO);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar la reseña.");
            }
            return Ok(rsp);
        }

        [HttpDelete]
        [Route("Eliminar/{id}/{userId}")]
        public async Task<IActionResult> EliminarReseña(int id, int userId)
        {
            var rsp = new Response<bool>();
            try
            {
                rsp.status = await _reseñaService.DeleteReview(id, userId);
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
