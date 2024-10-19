using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;


namespace WebApiApoyo.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class ConsultaController : ControllerBase
    {
        private readonly IConsultaService _consultaService;
        private readonly ILogger<ConsultaController> _logger;

        public ConsultaController(IConsultaService consultaService, ILogger<ConsultaController> logger)
        {
            _consultaService = consultaService;
            _logger = logger;
        }

        [HttpGet]
        [Route("Listar Consultas")]
        public async Task<IActionResult> ListaConsultas()
        {
            var rsp = new Response<List<ConsultaDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _consultaService.ConsultarConsultas();
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener la actividad.");
            }
            return Ok(rsp);
        }


        [HttpGet]
        [Route("Titulo Consulta")]
        public async Task<IActionResult> ListaConsultaPorTitulo(string titulo)
        {
            if (string.IsNullOrWhiteSpace(titulo))
            {
                return BadRequest("El titulo no es válido.");
            }

            var rsp = new Response<List<ConsultaDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _consultaService.ConsultarPorTitulo(titulo);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el nombre de la consulta.");
            }
            return Ok(rsp);
        }




        [HttpGet]
        [Route("Consulta ID")]
        public async Task<IActionResult> ListaConsultaPorId(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<ConsultaDTO>();
            try
            {
                rsp.value = await _consultaService.ObtenerConsultaPorId(id);

                rsp.status = true;
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el id de la consulta.");
            }
            return Ok(rsp);
        }

        [HttpPost]
        [Route("Crear Consulta")]
        public async Task<IActionResult> CrearConsulta([FromBody] ConsultaDTO consultaDto)
        {
            if (consultaDto == null)
            {
                return BadRequest("Los datos de la consulta son inválidos.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _consultaService.CrearConsulta(consultaDto);
                rsp.status = true;
                rsp.value = "Consulta creada con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al crear la consulta.");
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("Editar Consulta")]
        public async Task<IActionResult> EditarConsulta(int id, [FromBody] ConsultaDTO consultaDto)
        {
            if (id != consultaDto.Idconsulta)
            {
                return BadRequest("El ID de la consulta no coincide con el ID proporcionado.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _consultaService.ActualizarConsulta(consultaDto);
                rsp.status = true;
                rsp.value = "Consulta actualizada con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar la consulta.");
            }
            return Ok(rsp);
        }

    }
}