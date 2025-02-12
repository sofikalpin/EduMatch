﻿using Microsoft.AspNetCore.Mvc;
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
using Microsoft.EntityFrameworkCore;
using SistemaApoyo.DAL;
using SistemaApoyo.Model;

[Route("API/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;
    private readonly ILogger<UsuarioController> _logger;
    private readonly IConfiguration _configuration;
    private readonly S31Grupo2AprendizajeYApoyoDeInglesContext _context; // Declarar el DbContext

    public UsuarioController(
        IUsuarioService usuarioService,
        ILogger<UsuarioController> logger,
        IConfiguration configuration,
        S31Grupo2AprendizajeYApoyoDeInglesContext context) // Inyectar el DbContext
    {
        _usuarioService = usuarioService;
        _logger = logger;
        _configuration = configuration;
        _context = context; // Inicializar el DbContext
    }

    [HttpGet("ListaUsuarios")]
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

    [HttpGet]
    [Route("BuscarUsuario")]
    public async Task<IActionResult> ObtenerUsuario(int idUsuario)
    {
        var rsp = new Response<UsuarioDTO>();
        try
        {
            // Verificación de que el login no sea nulo y los campos necesarios estén presentes
            if (idUsuario == null || idUsuario <= 0)
            {
                rsp.status = false;
                rsp.msg = "El dato de idUsuario son obligatorios.";
                return BadRequest(rsp);
            }

            var usuario = await _usuarioService.ObtenerUsuarioPorID(idUsuario);

            if (usuario == null)
            {
                rsp.status = false;
                rsp.msg = "Id ingresado incorrecto.";
                return Unauthorized(rsp);
            }

            rsp.status = true;
            rsp.value = usuario;
            return Ok(rsp);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener datos");
            return StatusCode(500, new Response<UsuarioDTO>
            {
                status = false,
                msg = "Error interno del servidor"
            });
        }
    }

    [HttpPost]
    [Route("InformacionUsuario")]
    public async Task<IActionResult> InformacionUsuario([FromBody] LoginDTO login) 
    {
        var rsp = new Response<UsuarioDTO>();
        try
        {
            // Verificación de que el login no sea nulo y los campos necesarios estén presentes
            if (login == null || string.IsNullOrEmpty(login.Correo) || string.IsNullOrEmpty(login.ContrasenaHash))
            {
                rsp.status = false;
                rsp.msg = "El correo y la contraseña son obligatorios.";
                return BadRequest(rsp);
            }

            var usuario = await _usuarioService.ObtenerUsuarioPorCorreo(login.Correo);

            if (usuario == null)
            {
                rsp.status = false;
                rsp.msg = "Correo o contraseña incorrectos.";
                return Unauthorized(rsp);
            }

            rsp.status = true;
            rsp.value = usuario;
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

    [HttpPost("GuardarUsuario")]
    public async Task<IActionResult> Guardar([FromBody] UsuarioDTO usuario)
    {
        var rsp = new Response<UsuarioDTO>();
        try
        {
            var idMaximo = (await _context.Usuarios.MaxAsync(c => (int?)c.Idusuario) ?? 0) + 1;

            if (string.IsNullOrEmpty(usuario.ContraseñaHash))
            {
                rsp.status = false;
                rsp.msg = "La contraseña no puede estar vacía.";
                return BadRequest(rsp);
            }

            var listausuario = await _usuarioService.Lista();

            if (listausuario.Any(u => u.Correo == usuario.Correo))
            {
                rsp.status = false;
                rsp.msg = "El usuario debe tener un mail diferente.";
                return BadRequest(rsp);
            }

           
            if (usuario.Idrol == 1)
            {
                usuario.AutProf = false;
            }
            else
            {
                usuario.AutProf = null;
            } 
            
            usuario.Idusuario = idMaximo;
            rsp.status = true;
            rsp.value = await _usuarioService.Crear(usuario);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Ocurrió un error inesperado al intentar guardar el usuario.";
            _logger.LogError(ex, "Error al guardar usuario con correo: {Correo}", usuario.Correo);
            return StatusCode(500, rsp);
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

    [HttpPost("SolicitudToken")]
    public async Task<IActionResult> SolicitarRecuperacionContraseña([FromBody] string correo)
    {
        var rsp = new Response<bool>();
        try
        {
            if (string.IsNullOrEmpty(correo))
            {
                rsp.status = false;
                rsp.msg = "El correo es requerido.";
                return BadRequest(rsp);
            }

            bool resultado = await _usuarioService.GenerarTokenRecuperacion(correo);

            if (resultado)
            {
                rsp.status = true;
                rsp.msg = "Se ha enviado un correo con las instrucciones para recuperar tu contraseña.";
                return Ok(rsp);
            }

            rsp.status = false;
            rsp.msg = "No se pudo procesar la solicitud de recuperación.";
            return BadRequest(rsp);
        }
        catch (InvalidOperationException ex)
        {
            rsp.status = false;
            rsp.msg = ex.Message;
            return NotFound(rsp);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Error interno del servidor.";
            _logger.LogError(ex, "Error en SolicitarRecuperacionContraseña: {Message}", ex.Message);
            return StatusCode(500, rsp);
        }
    }

    [HttpPost("reestablecer-contrasena")]
    public async Task<IActionResult> ReestablecerContraseña([FromBody] ReestablecerContraseñaDTO modelo)
    {
        var rsp = new Response<bool>();
        try
        {
            if (string.IsNullOrEmpty(modelo.Token) || string.IsNullOrEmpty(modelo.NuevaContraseña))
            {
                rsp.status = false;
                rsp.msg = "El token y la nueva contraseña son requeridos.";
                return BadRequest(rsp);
            }

            bool resultado = await _usuarioService.ReestablecerContraseña(modelo.Token, modelo.NuevaContraseña);

            if (resultado)
            {
                rsp.status = true;
                rsp.msg = "Contraseña reestablecida exitosamente.";
                return Ok(rsp);
            }

            rsp.status = false;
            rsp.msg = "No se pudo reestablecer la contraseña.";
            return BadRequest(rsp);
        }
        catch (InvalidOperationException ex)
        {
            rsp.status = false;
            rsp.msg = ex.Message;
            return BadRequest(rsp);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Error interno del servidor.";
            _logger.LogError(ex, "Error en ReestablecerContraseña: {Message}", ex.Message);
            return StatusCode(500, rsp);
        }
    }

    [HttpPost("SubirCV")]
    public async Task<IActionResult> SubirCV(int idUsuario, IFormFile archivo)
    {
        var rsp = new Response<string>();

        // Validar que el archivo no sea nulo
        if (archivo == null || archivo.Length == 0)
        {
            rsp.status = false;
            rsp.msg = "Debe seleccionar un archivo.";
            return BadRequest(rsp);
        }

        // Validar el tipo de archivo (solo permitir PDF)
        var allowedExtensions = new[] { ".pdf" };
        var fileExtension = Path.GetExtension(archivo.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(fileExtension))
        {
            rsp.status = false;
            rsp.msg = "Solo se permiten archivos PDF.";
            return BadRequest(rsp);
        }

        try
        {
            // Definir la carpeta donde se guardarán los CVs (dentro de wwwroot/uploads)
            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Crear un nombre de archivo único (cv_{id}.pdf)
            string nombreArchivo = $"cv_{idUsuario}{Path.GetExtension(archivo.FileName)}";
            string rutaCompleta = Path.Combine(uploadsFolder, nombreArchivo);

            // Guardar el archivo en el servidor
            using (var stream = new FileStream(rutaCompleta, FileMode.Create))
            {
                await archivo.CopyToAsync(stream);
            }

            // Buscar el usuario en la base de datos
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Idusuario == idUsuario);
            if (usuario == null || usuario.Idrol != 1)
            {
                rsp.status = false;
                rsp.msg = "Usuario no encontrado o el usuario no corresponde al de un profesor.";
                return NotFound(rsp);
            }

            // Guardar la ruta en la base de datos
            usuario.CvRuta = rutaCompleta;
            await _context.SaveChangesAsync();

            rsp.status = true;
            rsp.msg = "CV subido exitosamente.";
            rsp.value = rutaCompleta;
            return Ok(rsp);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Error al subir el CV.";
            _logger.LogError(ex, "Error al subir el CV para usuario {IdUsuario}", idUsuario);
            return StatusCode(500, rsp);
        }
    }

    [HttpGet("ObtenerCV")]
    public async Task<IActionResult> ObtenerCV(int idUsuario)
    {
        var rsp = new Response<string>();

        try
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Idusuario == idUsuario);
            if (usuario == null || string.IsNullOrEmpty(usuario.CvRuta) || usuario.Idrol != 1)
            {
                rsp.status = false;
                rsp.msg = "CV no encontrado o el id del usuario buscado no corresponde aun profesor.";
                return NotFound(rsp);
            }

            string rutaArchivo = Path.Combine(Directory.GetCurrentDirectory(), usuario.CvRuta.Replace("\\", "/"));
            if (!System.IO.File.Exists(rutaArchivo))
            {
                return NotFound(new Response<string> { status = false, msg = "El archivo no existe en el servidor." });
            }

            rsp.status = true;
            //Se desarrolla la descarga automaticamente sin exponer la ruta del servidor
            byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(rutaArchivo);
            return File(fileBytes, "application/pdf", Path.GetFileName(usuario.CvRuta));

        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Error al obtener el CV.";
            _logger.LogError(ex, "Error al obtener el CV del usuario {IdUsuario}", idUsuario);
            return StatusCode(500, rsp);
        }
    }
    [HttpPost("ActualizarFoto")]
    public async Task<IActionResult> ActualizarFoto([FromBody] ActualizarFotoDTO modelo)
    {
        var rsp = new Response<string>();
        try
        {
            if (string.IsNullOrEmpty(modelo.Correo) || string.IsNullOrEmpty(modelo.Foto))
            {
                rsp.status = false;
                rsp.msg = "El correo y la foto son requeridos.";
                return BadRequest(rsp);
            }

            // Buscar el usuario
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Correo == modelo.Correo);
            if (usuario == null)
            {
                rsp.status = false;
                rsp.msg = "Usuario no encontrado.";
                return NotFound(rsp);
            }

            // Crear directorio si no existe
            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "fotos");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Generar nombre único para el archivo
            string nombreArchivo = $"foto_{usuario.Idusuario}_{DateTime.Now.Ticks}.jpg";
            string rutaCompleta = Path.Combine(uploadsFolder, nombreArchivo);

            // Convertir base64 a bytes y guardar
            var fotoBytes = Convert.FromBase64String(modelo.Foto.Split(',')[1]);
            await System.IO.File.WriteAllBytesAsync(rutaCompleta, fotoBytes);

            // Actualizar ruta en la base de datos
            usuario.FotoRuta = Path.Combine("fotos", nombreArchivo);
            await _context.SaveChangesAsync();

            rsp.status = true;
            rsp.msg = "Foto actualizada exitosamente.";
            rsp.value = usuario.FotoRuta;
            return Ok(rsp);
        }
        catch (Exception ex)
        {
            rsp.status = false;
            rsp.msg = "Error al actualizar la foto.";
            _logger.LogError(ex, "Error al actualizar foto para usuario {Correo}", modelo.Correo);
            return StatusCode(500, rsp);
        }
    }

    [HttpGet("ObtenerFoto/{correo}")]
    public async Task<IActionResult> ObtenerFoto(string correo)
    {
        try
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo);
            if (usuario == null || string.IsNullOrEmpty(usuario.FotoRuta))
            {
                return NotFound(new Response<string> { status = false, msg = "Foto no encontrada." });
            }

            string rutaCompleta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", usuario.FotoRuta);
            if (!System.IO.File.Exists(rutaCompleta))
            {
                return NotFound(new Response<string> { status = false, msg = "Archivo no encontrado." });
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(rutaCompleta);
            return File(bytes, "image/jpeg");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener foto para usuario {Correo}", correo);
            return StatusCode(500, new Response<string> { status = false, msg = "Error al obtener la foto." });
        }
    }



}


