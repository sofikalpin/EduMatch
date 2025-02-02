using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;

namespace WebApiApoyo.Controllers.Administrador
{
    public class AdministradorAlumnoController
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

            [HttpGet("Lista Alumnos")]
            public async Task<IActionResult> ListaAlumnos()
            {
                var rsp = new Response<List<UsuarioDTO>>();
                try
                {
                    rsp.status = true;
                    rsp.value = await _administradorService.ListaRol(2);
                }
                catch (Exception ex)
                {
                    rsp.status = false;
                    _logger.LogError(ex, "Error al obtener la lista de alumnos.");
                }

                return Ok(rsp);
            }

            [HttpGet]
            [Route("Busqueda Alumno Nombre")]
            public async Task<IActionResult> ListaAlumnoPorNombre(string nombre)
            {
                if (string.IsNullOrWhiteSpace(nombre))
                {
                    return BadRequest("El nombre no es  válido.");
                }

                var rsp = new Response<List<UsuarioDTO>>();
                try
                {
                    rsp.status = true;
                    rsp.value = await _administradorService.ConsultaNombre(2, nombre);
                }
                catch (Exception ex)
                {
                    rsp.status = false;
                    _logger.LogError(ex, "Error al obtener el nombre del alumno.");
                }
                return Ok(rsp);
            }

            [HttpGet]
            [Route("Busqueda Alumno Nivel")]
            public async Task<IActionResult> ListaAlumnoPorNivel(int nivel)
            {
                if (nivel < 0)
                {
                    return BadRequest("El nivel no es  válido.");
                }

                var rsp = new Response<List<UsuarioDTO>>();
                try
                {
                    rsp.status = true;
                    rsp.value = await _administradorService.ConsultaNivel(2, nivel);
                }
                catch (Exception ex)
                {
                    rsp.status = false;
                    _logger.LogError(ex, "Error al obtener el nivel del alumno.");
                }
                return Ok(rsp);
            }


            [HttpGet]
            [Route("Alumno ID")]
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

                    // Verificar si el idRol es igual a 2
                    if (usuario == null)
                    {
                        return NotFound("El usuario no existe.");
                    }

                    if (usuario.Idrol != 2)
                    {
                        return BadRequest("El usuario no tiene el rol de alumno.");
                    }

                    rsp.value = usuario;
                }
                catch (Exception ex)
                {
                    rsp.status = false;
                    _logger.LogError(ex, "Error al obtener el id del alumno");
                    return StatusCode(500, "Ocurrió un error interno del servidor.");
                }

                return Ok(rsp);
            }


            [HttpPost]
            [Route("Crear Alumno")]
            public async Task<IActionResult> CrearUsuario([FromBody] UsuarioDTO usuario)
            {
                var rsp = new Response<string>();
                try
                {
                    rsp.status = true;
                    var resultado = await _administradorService.CrearUsuario(usuario);
                    usuario.Idrol = 1;
                    rsp.value = "Usuario creado con éxito";
                }
                catch (Exception ex)
                {
                    rsp.status = false;
                    _logger.LogError(ex, "Error al guardar el usuario.");
                }
                return Ok(rsp);
            }

            [HttpPut]
            [Route("Editar por ID")]
            public async Task<IActionResult> EditarUsuario(int id, [FromBody] UsuarioDTO usuario)
            {
                if (id != usuario.Idusuario)
                {
                    return BadRequest("El ID del usuario no coincide con el ID proporcionado.");
                }

                var rsp = new Response<string>();
                try
                {
                    var resultado = await _administradorService.ActualizarUsuario(usuario);
                    rsp.status = true;
                    rsp.value = "Usuario actualizado con éxito.";
                }
                catch (Exception ex)
                {
                    rsp.status = false;
                    _logger.LogError(ex, "Error al actualizar el alumno.");
                }
                return Ok(rsp);
            }

            [HttpDelete]
            [Route("Eliminar Alumno")]
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
                    rsp.value = "Se elimino el alumno con exito.";
                }
                catch (Exception ex)
                {
                    rsp.status = false;
                    _logger.LogError(ex, "Error al eliminar el alumno");
                }
                return Ok(rsp);
            }

        }
    }
}
