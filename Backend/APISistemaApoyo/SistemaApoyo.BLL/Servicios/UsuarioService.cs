 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Net;
using Microsoft.Extensions.Logging;

namespace SistemaApoyo.BLL.Servicios
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGenericRepository<Usuario> _usuarioRepositorio;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UsuarioService> _logger;

        public UsuarioService(
     IGenericRepository<Usuario> usuarioRepositorio,
     IMapper mapper,
     IConfiguration configuration,
     ILogger<UsuarioService> logger) // Agrega este parámetro
        {
            _usuarioRepositorio = usuarioRepositorio;
            _mapper = mapper;
            _configuration = configuration;
            _logger = logger; // Inicializa el logger
        }

        public async Task<UsuarioDTO> Crear(UsuarioDTO modelo)
        {
            try
            {
                var usuario = _mapper.Map<Usuario>(modelo);

                // Hashear la contraseña antes de guardarla
                usuario.ContraseñaHash = HashearContrasena(modelo.ContraseñaHash);

                // Verificar si el correo ya existe
                var usuarioExistente = await _usuarioRepositorio.Obtener(u => u.Correo == modelo.Correo);
                if (usuarioExistente != null)
                {
                    throw new InvalidOperationException("El correo ya está registrado");
                }

                var usuarioCreado = await _usuarioRepositorio.Crear(usuario);
                if (usuarioCreado.Idusuario == 0)
                    throw new Exception("No se pudo crear el usuario");

                var query = await _usuarioRepositorio.Consultar(u => u.Idusuario == usuarioCreado.Idusuario);
                usuarioCreado = query.Include(u => u.IdrolNavigation).FirstOrDefault();

                return _mapper.Map<UsuarioDTO>(usuarioCreado);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al crear usuario: {ex.Message}");
                throw;
            }
        }


        public async Task<bool> Editar(UsuarioDTO modelo)
        {
            try
            {
                var usuarioModelo = _mapper.Map<Usuario>(modelo);
                var usuarioEncontrado = await _usuarioRepositorio.Obtener(u => u.Idusuario == usuarioModelo.Idusuario);
                if (usuarioEncontrado == null)
                    throw new InvalidOperationException("El usuario no existe");

                if (!string.IsNullOrEmpty(usuarioModelo.ContraseñaHash))
                    usuarioEncontrado.ContraseñaHash = HashearContrasena(usuarioModelo.ContraseñaHash);

                usuarioEncontrado.Nombrecompleto = usuarioModelo.Nombrecompleto;
                usuarioEncontrado.Correo = usuarioModelo.Correo;
                usuarioEncontrado.Idnivel = usuarioModelo.Idnivel;
                usuarioEncontrado.Idrol = usuarioModelo.Idrol;

                bool respuesta = await _usuarioRepositorio.Editar(usuarioEncontrado);
                if (!respuesta)
                    throw new Exception("No se pudo editar el usuario");

                return respuesta;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al editar usuario: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var usuarioEncontrado = await _usuarioRepositorio.Obtener(u => u.Idusuario == id);
                if (usuarioEncontrado == null)
                    throw new InvalidOperationException("El usuario no existe");

                bool respuesta = await _usuarioRepositorio.Eliminar(usuarioEncontrado);
                if (!respuesta)
                    throw new Exception("No se pudo eliminar el usuario");

                return respuesta;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar usuario: {ex.Message}");
                throw;
            }
        }

        public async Task<List<UsuarioDTO>> Lista()
        {
            try
            {
                var usuariosQuery = await _usuarioRepositorio.Consultar();
                var listaUsuarios = usuariosQuery.Include(u => u.IdrolNavigation).ToList();
                return _mapper.Map<List<UsuarioDTO>>(listaUsuarios);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener lista de usuarios: {ex.Message}");
                throw;
            }
        }

        public async Task<UsuarioDTO> ObtenerUsuarioPorCorreo(string correo)
        {
            try
            {
                var usuario = await _usuarioRepositorio.Obtener(u => u.Correo == correo);
                if (usuario == null)
                {
                    Console.WriteLine($"Usuario con correo {correo} no encontrado.");
                    throw new InvalidOperationException("Usuario no encontrado");
                }

                return _mapper.Map<UsuarioDTO>(usuario);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener usuario por correo: {ex.Message}");
                throw;
            }
        }

        public async Task<SesionDTO> ValidarCredenciales(string correo, string contrasena)
        {
            try
            {
                var usuario = await ObtenerUsuarioPorCorreo(correo);
                if (usuario != null && VerificarContrasena(contrasena, usuario.ContraseñaHash))
                {
                    return new SesionDTO
                    {
                        NombreCompleto = usuario.Nombrecompleto,
                        Correo = usuario.Correo
                    };
                }
                throw new UnauthorizedAccessException("Credenciales inválidas");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al validar credenciales: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> GenerarTokenRecuperacion(string correo)
        {
            try
            {
                // Buscar usuario por correo
                var usuario = await _usuarioRepositorio.Obtener(u => u.Correo == correo);
                if (usuario == null)
                    throw new InvalidOperationException("Usuario no encontrado");

                // Verificar si hay un token activo y válido
                if (!string.IsNullOrEmpty(usuario.TokenRecuperacion) &&
                    usuario.TokenExpiracion.HasValue &&
                    usuario.TokenExpiracion.Value > DateTime.UtcNow)
                {
                    // Invalidar token anterior
                    usuario.TokenRecuperacion = null;
                    usuario.TokenExpiracion = null;
                    await _usuarioRepositorio.Editar(usuario);
                }

                // Generar nuevo token
                var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));

                // Establecer expiración (24 horas)
                usuario.TokenRecuperacion = token;
                usuario.TokenExpiracion = DateTime.UtcNow.AddHours(24);

                // Guardar cambios
                bool resultado = await _usuarioRepositorio.Editar(usuario);
                if (!resultado)
                    throw new Exception("No se pudo guardar el token de recuperación");

                // Enviar correo
                await EnviarCorreoRecuperacion(usuario.Correo, token);

                // Registrar el intento de recuperación en el log
                _logger.LogInformation($"Solicitud de recuperación de contraseña generada para el correo: {correo} en {DateTime.UtcNow}");

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error en GenerarTokenRecuperacion: {ex.Message}");
                throw;
            }
        }

        public string HashearContrasena(string contrasena)
        {
            var salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
                rng.GetBytes(salt);

            using (var pbkdf2 = new Rfc2898DeriveBytes(contrasena, salt, 10000, HashAlgorithmName.SHA256))
            {
                var hash = pbkdf2.GetBytes(32);
                var resultado = new byte[salt.Length + hash.Length];
                Array.Copy(salt, 0, resultado, 0, salt.Length);
                Array.Copy(hash, 0, resultado, salt.Length, hash.Length);
                return Convert.ToBase64String(resultado);
            }
        }

        public bool VerificarContrasena(string contrasena, string hashAlmacenado)
        {
            var datosHash = Convert.FromBase64String(hashAlmacenado);
            var salt = datosHash[..16];
            var hashOriginal = datosHash[16..];

            using (var pbkdf2 = new Rfc2898DeriveBytes(contrasena, salt, 10000, HashAlgorithmName.SHA256))
            {
                var hashRecalculado = pbkdf2.GetBytes(32);
                return hashOriginal.SequenceEqual(hashRecalculado);
            }
        }



        public async Task<bool> ReestablecerContraseña(string token, string nuevaContraseña)
        {
            try
            {
                // Buscar usuario por token
                var usuario = await _usuarioRepositorio.Obtener(u => u.TokenRecuperacion == token);

                // Validar token y su expiración
                if (usuario == null ||
                    string.IsNullOrEmpty(usuario.TokenRecuperacion) ||
                    !usuario.TokenExpiracion.HasValue ||
                    usuario.TokenExpiracion.Value < DateTime.UtcNow)
                {
                    throw new InvalidOperationException("Token inválido o expirado");
                }

                // Hashear nueva contraseña
                usuario.ContraseñaHash = HashearContrasena(nuevaContraseña);

                // Limpiar token y expiración
                usuario.TokenRecuperacion = null;
                usuario.TokenExpiracion = null;

                // Guardar cambios
                bool resultado = await _usuarioRepositorio.Editar(usuario);
                if (!resultado)
                    throw new Exception("No se pudo actualizar la contraseña");

                // Registrar el cambio exitoso en el log
                _logger.LogInformation($"Contraseña actualizada exitosamente para el usuario: {usuario.Correo} en {DateTime.UtcNow}");

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error en ReestablecerContraseña: {ex.Message}");
                throw;
            }
        }


        public async Task EnviarCorreoRecuperacion(string correoDestino, string token)
        {
            try
            {
                var emailSettings = _configuration.GetSection("EmailSettings");
                var smtpClient = new SmtpClient(emailSettings["SmtpServer"])
                {
                    Port = int.Parse(emailSettings["SmtpPort"] ?? "587"), // 587 es el puerto recomendado para STARTTLS
                    Credentials = new NetworkCredential(emailSettings["SmtpUser"], emailSettings["SmtpPassword"]),
                    EnableSsl = true // Asegúrate de habilitar SSL/TLS para STARTTLS
                };

                // Aquí construyes el enlace con el token como parámetro
                var resetUrl = $"http://localhost:3000/contra?token={token}";  // Asegúrate de que la ruta sea correcta

                var mensaje = new MailMessage
                {
                    From = new MailAddress(emailSettings["FromEmail"], "Sistema de Apoyo"),
                    Subject = "Recuperación de Contraseña",
                    Body = $@"
<h2>Recuperación de Contraseña</h2>
<p>Has solicitado restablecer tu contraseña.</p>
<p>Para continuar, haz clic en el siguiente enlace:</p>
<p><a href='{resetUrl}'>Restablecer Contraseña</a></p>
<p>Este enlace expirará en 24 horas.</p>
<p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
<p>Nota: Si recibes múltiples correos de recuperación, solo el último enlace enviado será válido.</p>",
                    IsBodyHtml = true
                };
                mensaje.To.Add(correoDestino);

                // Enviar el correo
                await smtpClient.SendMailAsync(mensaje);

                _logger.LogInformation($"Correo de recuperación enviado a: {correoDestino} en {DateTime.UtcNow}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al enviar correo de recuperación: {ex.Message}");
                throw;
            }
        }







    }




}
