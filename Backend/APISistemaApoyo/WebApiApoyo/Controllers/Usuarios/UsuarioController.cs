using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios;
using System.Text.Json.Nodes;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

[Route("API/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;
    private readonly ILogger<UsuarioController> _logger;
    private readonly IConfiguration _configuration;

    // Modificado para incluir IConfiguration
    public UsuarioController(IUsuarioService usuarioService, ILogger<UsuarioController> logger, IConfiguration configuration)
    {
        _usuarioService = usuarioService;
        _logger = logger;
        _configuration = configuration; // Asignar la configuración aquí
    }

    [HttpGet("Lista Usuarios")]
    public async Task<IActionResult> Lista()
    {
        var rsp = new Response<List<UsuarioDTO>>();
        try
        {
            rsp.status = true;
            rsp.value = await _usuarioService.Lista();
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Error al obtener la lista de usuarios.";
            _logger.LogError(ex, "Error al obtener la lista de usuarios.");
            return StatusCode(500, rsp);
        }
        return Ok(rsp);
    }

    [HttpPost("IniciarSesion")]
    public async Task<IActionResult> IniciarSesion([FromBody] LoginDTO login)
    {
        var rsp = new Response<SesionDTO>();
        try
        {
            // Verificación de que el login no sea nulo y los campos necesarios estén presentes
            if (login == null || string.IsNullOrEmpty(login.Correo) || string.IsNullOrEmpty(login.ContrasenaHash))
            {
                rsp.status = false;
                rsp.msg = "El correo y la contraseña son obligatorios.";
                return BadRequest(rsp);
            }

            var sesion = await _usuarioService.ValidarCredenciales(login.Correo, login.ContrasenaHash);

            if (sesion == null)
            {
                rsp.status = false;
                rsp.msg = "Correo o contraseña incorrectos.";
                return Unauthorized(rsp);
            }

            // Generar un token (puedes usar JWT, por ejemplo)
            var token = GenerarToken(sesion.Correo); // Implementa este método

            rsp.status = true;
            rsp.value = sesion;
            rsp.token = token; // Agrega el token a la respuesta
            rsp.msg = "Inicio de sesión exitoso.";
            return Ok(rsp);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al iniciar sesión para correo: {Correo}", login?.Correo);
            return StatusCode(500, new Response<SesionDTO>
            {
                status = false,
                msg = "Error interno del servidor"
            });
        }
    }

    private string GenerarToken(string correo)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["JwtConfig:Secret"]);

        // Asegúrate de que la clave tenga al menos 128 bits (16 bytes)
        if (key.Length < 16)
        {
            throw new ArgumentException("La clave secreta para JWT debe tener al menos 128 bits (16 bytes).");
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Email, correo) }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    [HttpPost("Guardar Usuario")]
    public async Task<IActionResult> Guardar([FromBody] UsuarioDTO usuario)
    {
        var rsp = new Response<UsuarioDTO>();
        try
        {
            // Verifica que el usuario no sea null
            if (usuario == null)
            {
                rsp.status = false;
                rsp.msg = "El usuario no puede ser nulo.";
                return BadRequest(rsp);
            }

            _logger.LogInformation("Hashing password: {PasswordHash}", usuario.ContraseñaHash);

            if (string.IsNullOrEmpty(usuario.ContraseñaHash))
            {
                rsp.status = false;
                rsp.msg = "La contraseña no puede estar vacía.";
                return BadRequest(rsp);
            }

            // Hashear la contraseña antes de guardar
            usuario.ContraseñaHash = _usuarioService.HashearContrasena(usuario.ContraseñaHash);

            // Error en el hasheo
            if (string.IsNullOrEmpty(usuario.ContraseñaHash))
            {
                rsp.status = false;
                rsp.msg = "La contraseña no puede estar vacía.";
                return BadRequest(rsp); // Devuelve 400
            }

            rsp.status = true;
            rsp.value = await _usuarioService.Crear(usuario);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Ocurrió un error inesperado al intentar guardar el usuario.";
            _logger.LogError(ex, "Error al guardar usuario con correo: {Correo}", usuario?.Correo);
            return StatusCode(500, rsp);  // 500 para errores internos del servidor
        }
        return Ok(rsp);
    }

    [HttpPut("EditarUsuario")]
    public async Task<IActionResult> Editar([FromBody] UsuarioDTO usuario)
    {
        var rsp = new Response<bool>();
        try
        {
            var resultado = await _usuarioService.Editar(usuario);
            rsp.status = resultado;
            if (!resultado)
            {
                rsp.msg = "No se pudo editar el usuario.";
                return BadRequest(rsp);  // 400 si la edición falla
            }
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Error al editar el usuario.";
            _logger.LogError(ex, "Error al editar el usuario.");
            return StatusCode(500, rsp);  // 500 para errores internos del servidor
        }
        return Ok(rsp);
    }

}
