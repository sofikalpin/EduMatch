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

[Route("API/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;
    private readonly ILogger<UsuarioController> _logger;

    public UsuarioController(IUsuarioService usuarioService, ILogger<UsuarioController> logger)
    {
        _usuarioService = usuarioService;
        _logger = logger;
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

    [HttpPost]
    [Route("Iniciar Sesion")]
    public async Task<IActionResult> IniciarSesion([FromBody] LoginDTO login)
    {
        var rsp = new Response<SesionDTO>();
        try
        {
            var sesion = await _usuarioService.ValidarCredenciales(login.Correo, login.ContrasenaHash);

            if (sesion == null) 
            { 
                rsp.status = false;
                rsp.msg = "Correo o contraseña incorrectos.";
                return Unauthorized(rsp); 
            }
            
            rsp.status = true;
            rsp.value = sesion;
            rsp.msg = "Inicio de sesión exitoso.";
            return Ok(rsp);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Error al iniciar sesión.";
            _logger.LogError(ex, "Error al iniciar sesión para correo: {Correo}", login.Correo);
            return StatusCode(500, rsp);  // Mejor usar 500 para errores inesperados
        }
    }

    [HttpPost("Guardar Usuario")]
    public async Task<IActionResult> Guardar([FromBody] UsuarioDTO usuario)
    {
        var rsp = new Response<UsuarioDTO>();
        try
        {
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
                rsp.msg = "Error al hashear la contraseña.";
                return BadRequest(rsp);
            }

            rsp.status = true;
            rsp.value = await _usuarioService.Crear(usuario);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Ocurrió un error inesperado al intentar guardar el usuario.";
            _logger.LogError(ex, "Error al guardar usuario con correo: {Correo}", usuario.Correo);
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
