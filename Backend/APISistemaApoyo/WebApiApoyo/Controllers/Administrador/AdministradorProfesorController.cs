using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Http;
using SistemaApoyo.BLL.Servicios;

namespace WebApiApoyo.Controllers.Administrador
{
    [Route("API/[controller]")]
    [ApiController]

    public class AdministradorProfesorController : ControllerBase
    {
        private readonly IAdministrador _administradorService;
        private readonly ILogger<AdministradorProfesorController> _logger;

        public AdministradorProfesorController(IAdministrador administradorService, ILogger<AdministradorProfesorController> logger)
        {
            _administradorService = administradorService;
            _logger = logger;
        }

        [HttpGet("Lista Profesores")]
        public async Task<IActionResult> ListaProfesores() 
        { 
            var rsp = new Response<List<UsuarioDTO>>();
            try 
            {
                rsp.status = true;
                rsp.value = await _administradorService.ListaRol(1);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener la lista de profesores.");
            }

            return Ok(rsp);
        }

        [HttpPut]
        [Route("Autorizar Profesor")]
        public async Task<IActionResult> AutorizarProfesor(int id) 
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<string>();

            try
            {
                var eli = await _administradorService.AutorizarProfesor(id);
                rsp.status = true;
                rsp.value = "Se autorizo el profesor con exito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al autorizar el profesor");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Busqueda Profesor Nombre")]
        public async Task<IActionResult> ListaProfesorPorNombre(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
            {
                return BadRequest("El nombre no es  válido.");
            }

            var rsp = new Response<List<UsuarioDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _administradorService.ConsultaNombre(1, nombre);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el nombre del profesor.");
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Busqueda Profesor Nivel")]
        public async Task<IActionResult> ListaProfesorPorNivel(int nivel)
        {
            if (nivel < 0)
            {
                return BadRequest("El nivel no es  válido.");
            }

            var rsp = new Response<List<UsuarioDTO>>();
            try
            {
                rsp.status = true;
                rsp.value = await _administradorService.ConsultaNivel(1, nivel);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el nivel del profesor.");
            }
            return Ok(rsp);
        }


        [HttpGet]
        [Route("Profesor ID")]
        public async Task<IActionResult> BusquedaProfesorID(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }

            var rsp = new Response<UsuarioDTO>();
            try
            {
                rsp.status = true;

                // Obtener el usuario por ID
                var usuario = await _administradorService.ObtenerUsuarioId(id);

                // Verificar si el idRol es igual a 1
                if (usuario == null)
                {
                    return NotFound("El usuario no existe.");
                }

                if (usuario.Idrol != 1)
                {
                    return BadRequest("El usuario no tiene el rol de profesor.");
                }

                rsp.value = usuario;
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al obtener el id del profesor");
                return StatusCode(500, "Ocurrió un error interno del servidor.");
            }

            return Ok(rsp);
        }


        [HttpPost]
        [Route("Crear Profesor")]
        public async Task<IActionResult> CrearUsuario([FromBody] UsuarioDTO usuario)
        {
            var rsp = new Response<string>();
            try
            {
                rsp.status = true;
                var resultado = await _administradorService.CrearUsuario(usuario);
                usuario.Idrol = 1;
                rsp.value = "Profesor creado con éxito";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al guardar el profesor.");
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("Editar por ID")]
        public async Task<IActionResult> EditarUsuario(int id, [FromBody] UsuarioDTO usuario)
        {
            if (id != usuario.Idusuario)
            {
                return BadRequest("El ID del profesor no coincide con el ID proporcionado.");
            }

            var rsp = new Response<string>();
            try
            {
                var resultado = await _administradorService.ActualizarUsuario(usuario);
                rsp.status = true;
                rsp.value = "Profesor actualizada con éxito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al actualizar el profesor.");
            }
            return Ok(rsp);
        }

        [HttpDelete]
        [Route("Eliminar Profesor")]
        public async Task<IActionResult> EliminarProfesor(int id)
        {
            if (id <= 0)
            {
                return BadRequest("El ID proporcionado no es válido.");
            }


            var rsp = new Response<string>();

            try
            {
                var eli = await _administradorService.EliminarUsuario(id);
                rsp.status = true;
                rsp.value = "Se elimino el profesor con exito.";
            }
            catch (Exception ex)
            {
                rsp.status = false;
                _logger.LogError(ex, "Error al eliminar el profesor");
            }
            return Ok(rsp);
        }

    }
}
