
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.Utility;
using SistemaApoyo.Model;
using SistemaApoyo.DAL;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using SistemaApoyo.DAL.DBContext;
using Microsoft.EntityFrameworkCore;
namespace WebApiApoyo.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AccesoController : ControllerBase
    {
        public readonly S31Grupo2AprendizajeYApoyoDeInglesContext _dbContext;
        public readonly Utilidades _utilidades;
        public AccesoController(S31Grupo2AprendizajeYApoyoDeInglesContext dbContext, Utilidades utilidades)
        {
            _dbContext = dbContext;
            _utilidades = utilidades;
        }
        [HttpPost("Acceso")]
        public async Task<IActionResult> Acceso(AccesoDTO objeto)
        {
            try
            {
                // Verificar que solo el administrador fijo pueda acceder
                if (objeto.Correo != "admin@sistema.com")
                {
                    return Unauthorized(new { mensaje = "Acceso denegado" });
                }
                // Hashear la contraseña enviada por el usuario
                string hashedPassword = _utilidades.encriptarSHA256(objeto.Clave);
                // Buscar el administrador en la base de datos
                var administrador = await _dbContext.Administradors
                    .FirstOrDefaultAsync(a =>
                        a.Correo == "admin@sistema.com" &&
                        a.Clave == hashedPassword);
                if (administrador == null)
                    return Unauthorized(new { mensaje = "Credenciales inválidas" });
                // Generar el token JWT
                string token = _utilidades.generarJWT(administrador);
                Response.Cookies.Delete("X-Access-Token"); // Eliminar token anterior antes de agregar el nuevo
                Response.Cookies.Append("X-Access-Token", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // IMPORTANTE: debe ser false en desarrollo sin HTTPS
                    SameSite = SameSiteMode.Lax,
                    Expires = DateTime.UtcNow.AddMinutes(5)
                });
                return Ok(new
                {
                    mensaje = "Login exitoso",
                    usuario = new
                    {
                        id = administrador.Idadmin,
                        nombre = administrador.Nombre,
                        correo = administrador.Correo,
                        isApiAdmin = true // Indica que es el administrador de las APIs
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensaje = "Error interno del servidor" });
            }
        }
        [HttpPost]
        [Route("CerrarSesion")]
        public IActionResult CerrarSesion()
        {
            // Eliminar la cookie de sesión
            Response.Cookies.Delete("X-Access-Token");

            return Ok(new { mensaje = "Sesión cerrada exitosamente" });
        }

        [HttpGet]
        [Route("ValidarSesion")]
        [Authorize] // Requiere autenticación
        public IActionResult ValidarSesion()
        {
            return Ok(new { isValid = true });
        }
    }
}