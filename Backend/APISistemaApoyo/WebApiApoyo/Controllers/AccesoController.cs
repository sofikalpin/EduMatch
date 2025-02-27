using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SistemaApoyo.Utility;
using SistemaApoyo.DAL.DBContext;
using SistemaApoyo.DTO;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebApiApoyo.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AccesoController : ControllerBase
    {
        private readonly S31Grupo2AprendizajeYApoyoDeInglesContext _dbContext;
        private readonly Utilidades _utilidades;
        private readonly ILogger<AccesoController> _logger;

        public AccesoController(S31Grupo2AprendizajeYApoyoDeInglesContext dbContext, Utilidades utilidades, ILogger<AccesoController> logger)
        {
            _dbContext = dbContext;
            _utilidades = utilidades;
            _logger = logger;
        }

        [HttpPost("Acceso")]
        public async Task<IActionResult> Acceso(AccesoDTO objeto)
        {
            try
            {
                // Verificar si el correo corresponde al administrador
                if (objeto.Correo != "admin@sistema.com")
                {
                    return Unauthorized(new { mensaje = "Acceso denegado" });
                }

                // Hashear la contraseña
                string hashedPassword = _utilidades.encriptarSHA256(objeto.Clave);

                // Buscar el administrador en la base de datos
                var administrador = await _dbContext.Administradors
                    .FirstOrDefaultAsync(a => a.Correo == "admin@sistema.com" && a.Clave == hashedPassword);

                if (administrador == null)
                {
                    return Unauthorized(new { mensaje = "Credenciales inválidas" });
                }

                // Generar el token JWT
                string token = _utilidades.generarJWT(administrador);

                // Configuración de la cookie
                Response.Cookies.Delete("X-Access-Token"); // Eliminar cookie anterior
                Response.Cookies.Append("X-Access-Token", token, new CookieOptions
                {
                    HttpOnly = true,    // Impide acceso desde JavaScript
                    Secure = true,      // Debe estar en true si usas HTTPS en producción
                    SameSite = SameSiteMode.None, // None si frontend y backend están en dominios diferentes
                    Expires = DateTime.UtcNow.AddHours(24) // Duración de la cookie
                });

                return Ok(new
                {
                    mensaje = "Login exitoso",
                    usuario = new
                    {
                        id = administrador.Idadmin,
                        nombre = administrador.Nombre,
                        correo = administrador.Correo,
                        isApiAdmin = true
                    },
                    token = token
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el proceso de acceso.");
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }

        [HttpPost("CerrarSesion")]
        public IActionResult CerrarSesion()
        {
            try
            {
                Response.Cookies.Delete("X-Access-Token"); // Eliminar cookie de sesión
                return Ok(new { mensaje = "Sesión cerrada exitosamente" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al cerrar sesión.");
                return StatusCode(500, new { mensaje = "Error al cerrar sesión" });
            }
        }

        [HttpGet("ValidarSesion")]
        [Authorize]
        public IActionResult ValidarSesion()
        {
            try
            {
                var usuarioId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                var correo = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

                return Ok(new
                {
                    isValid = true,
                    usuario = new { usuarioId, correo }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al validar la sesión.");
                return StatusCode(500, new { mensaje = "Error al validar sesión" });
            }
        }
    }
}
