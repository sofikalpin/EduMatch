using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Linq.Expressions;

namespace SistemaApoyo.BLL.Servicios
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGenericRepository<Usuario> _usuarioRepositorio;
        private readonly IMapper _mapper;
        private readonly PasswordHasher<object> _passwordHasher;

        public UsuarioService(IGenericRepository<Usuario> usuarioRepositorio, IMapper mapper)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _mapper = mapper;
            _passwordHasher = new PasswordHasher<object>();
        }

        public async Task<UsuarioDTO> Crear(UsuarioDTO modelo)
        {
            try
            {
                
                var usuarioCreado = await _usuarioRepositorio.Crear(_mapper.Map<Usuario>(modelo));
                if (usuarioCreado.Idusuario == 0)
                    _mapper.Map<Usuario>(modelo);

                var query = await _usuarioRepositorio.Consultar(u => u.Idusuario == usuarioCreado.Idusuario);
                usuarioCreado = query.Include(rol => rol.IdrolNavigation).First();

                return _mapper.Map<UsuarioDTO>(usuarioCreado);
            }
            catch { 
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
                    throw new TaskCanceledException("El usuario no existe");

                if (!string.IsNullOrEmpty(usuarioModelo.ContraseñaHash))
                {
                    usuarioEncontrado.ContraseñaHash = HashearContrasena(usuarioModelo.ContraseñaHash);
                }

                usuarioEncontrado.Nombrecompleto = usuarioModelo.Nombrecompleto;
                usuarioEncontrado.Correo = usuarioModelo.Correo;
                usuarioEncontrado.Idnivel = usuarioModelo.Idnivel;
                usuarioEncontrado.Idrol = usuarioModelo.Idrol;

                bool respuesta = await _usuarioRepositorio.Editar(usuarioEncontrado);
                if( !respuesta )
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al editar usuario: {ex.Message}");
                throw ;
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var usuarioEncontrado = await _usuarioRepositorio.Obtener(u => u.Idusuario == id);
                if (usuarioEncontrado == null)
                    throw new TaskCanceledException("El usuario no existe");
                bool respuesta = await _usuarioRepositorio.Eliminar(usuarioEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;

                
            }
            catch 
            {
                throw ;
            }
        }

        public async Task<List<UsuarioDTO>> Lista()
        {
            try
            {
                var usuariosQuery = await _usuarioRepositorio.Consultar();
                var listaUsuarios = usuariosQuery.Include(rol => rol.IdrolNavigation).ToList();
                return _mapper.Map<List<UsuarioDTO>>(listaUsuarios);
            }
            catch 
            {
                throw;
            }
        }

        public async Task<UsuarioDTO> ObtenerUsuarioPorCorreo(string correo)
        {
            try
            {
                var usuarioQuery = await _usuarioRepositorio.Obtener(u => u.Correo == correo);
                if (usuarioQuery == null)
                {
                    Console.WriteLine($"No se encontró un usuario con el correo: {correo}");
                    throw new Exception("Usuario no encontrado");
                }
                Console.WriteLine($"Usuario encontrado: {usuarioQuery.Correo}, {usuarioQuery.Nombrecompleto}");
                return _mapper.Map<UsuarioDTO>(usuarioQuery);
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
                // Buscar al usuario por su correo
                var usuario = await ObtenerUsuarioPorCorreo(correo);

                if (usuario != null)
                {
                    // Verificar la contraseña
                    if (VerificarContrasena(contrasena, usuario.ContraseñaHash))
                    {
                        Console.WriteLine($"Usuario encontrado: {usuario.Nombrecompleto}, {usuario.Correo}");
                        return new SesionDTO
                        {
                            NombreCompleto = usuario.Nombrecompleto,
                            Correo = usuario.Correo
                        };
                    }
                }
                Console.WriteLine($"Usuario con correo {correo} no encontrado.");
                throw new UnauthorizedAccessException("Credenciales inválidas");
            }
            catch (Exception ex) 
            {
                Console.WriteLine($"Error al validar credencialess: {ex.Message}");
                throw;
            }
        }

        public string HashearContrasena(string contrasena)
        {
            if (string.IsNullOrEmpty(contrasena))
            {
                throw new ArgumentException("La contraseña no puede estar vacía.");
            }
            // Generar un salt único
            var salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Usar PBKDF2 para generar el hash de la contraseña
            var iteraciones = 10000;
            using (var pbkdf2 = new Rfc2898DeriveBytes(contrasena, salt, iteraciones, HashAlgorithmName.SHA256))
            {
                var hash = pbkdf2.GetBytes(32);

                // Combinar el salt y el hash en un solo arreglo
                var resultado = new byte[salt.Length + hash.Length];
                Array.Copy(salt, 0, resultado, 0, salt.Length);
                Array.Copy(hash, 0, resultado, salt.Length, hash.Length);

                // Retornar el resultado como Base64 para almacenamiento
                return Convert.ToBase64String(resultado);
            }
        }

        public bool VerificarContrasena(string contrasena, string hashAlmacenado)
        {
            // Convertir el hash almacenado desde Base64 a un arreglo de bytes
            var datosHash = Convert.FromBase64String(hashAlmacenado);

            // Extraer el salt (primeros 16 bytes)
            var salt = new byte[16];
            Array.Copy(datosHash, 0, salt, 0, 16);

            // Extraer el hash original (resto de los bytes)
            var hashOriginal = new byte[32];
            Array.Copy(datosHash, 16, hashOriginal, 0, 32);

            // Recalcular el hash con la contraseña proporcionada
            var iteraciones = 10000;
            using (var pbkdf2 = new Rfc2898DeriveBytes(contrasena, salt, iteraciones, HashAlgorithmName.SHA256))
            {
                var hashRecalculado = pbkdf2.GetBytes(32);

                Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");
                Console.WriteLine($"Hash recalculado: {Convert.ToBase64String(hashRecalculado)}");
                Console.WriteLine($"Hash original: {Convert.ToBase64String(hashOriginal)}");

                // Comparar ambos hashes de manera segura
                return hashOriginal.SequenceEqual(hashRecalculado);

            }
        }

    }
}
