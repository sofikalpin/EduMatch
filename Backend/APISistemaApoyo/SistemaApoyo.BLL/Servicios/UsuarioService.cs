using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace SistemaApoyo.BLL.Servicios
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGenericRepository<Usuario> _usuarioRepositorio;
        private readonly IMapper _mapper;

        public UsuarioService(IGenericRepository<Usuario> usuarioRepositorio, IMapper mapper)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _mapper = mapper;
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
    }
}
