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
using BotCrypt;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace SistemaApoyo.BLL.Servicios
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGenericRepository<Usuario> _usuarioRepositorio;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;  // Usamos IConfiguration aquí

        // Constructor actualizado
        public UsuarioService(IGenericRepository<Usuario> usuarioRepositorio, IMapper mapper, IConfiguration configuration)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _mapper = mapper;
            _configuration = configuration;  // Se inyecta IConfiguration
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
            catch
            {
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

                string Llave = "ContrasenasHasheadas101";
                string ContrasenaNueva = Crypter.EncryptString(Llave, usuarioModelo.ContraseñaHash);

                usuarioEncontrado.Nombrecompleto = usuarioModelo.Nombrecompleto;
                usuarioEncontrado.Correo = usuarioModelo.Correo;
                usuarioEncontrado.ContraseñaHash = usuarioModelo.ContraseñaHash;
                usuarioEncontrado.Idnivel = usuarioModelo.Idnivel;
                usuarioEncontrado.Idrol = usuarioModelo.Idrol;

                bool respuesta = await _usuarioRepositorio.Editar(usuarioEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;

            }
            catch
            {
                throw;
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
                throw;
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
                var usuarioQuery = await _usuarioRepositorio.Consultar();
                if (!string.IsNullOrEmpty(correo))
                {
                    usuarioQuery = usuarioQuery.Where(v => v.Correo == correo);
                }

                var usuario = await usuarioQuery.FirstOrDefaultAsync();  // Devuelve un solo usuario o null
                return _mapper.Map<UsuarioDTO>(usuario);
            }
            catch
            {
                throw;
            }
        }


        public async Task<SesionDTO> ValidarCredenciales(string correo, string contrasena)
        {
            // Buscar al usuario por correo
            var usuario = await ObtenerUsuarioPorCorreo(correo);

            if (usuario != null)
            {
                // Verificar la contraseña
                string ContrasenaHasheada = usuario.ContrasenaHash;
                string ContrasenaOriginal = Crypter.DecryptString("ContrasenasHasheadas101", ContrasenaHasheada);

                if (ContrasenaOriginal == contrasena)
                {
                    // Credenciales correctas, generar el token JWT
                    var token = GenerarToken(usuario); // Llamamos al método para generar el token
                    return new SesionDTO
                    {
                        Correo = usuario.Correo,
                        NombreCompleto = usuario.Nombrecompleto,
                        Token = token // Enviamos el token al cliente
                    };
                }
            }

            return null; // Si las credenciales son incorrectas, devolvemos null
        }


        public string HashearContrasena(string contrasena)
        {
            string Texto = contrasena;
            string Llave = "ContrasenasHasheadas101";
            string ContrasenaHash = Crypter.EncryptString(Llave, Texto);
            return ContrasenaHash;
        }

        private string GenerarToken(UsuarioDTO usuario)
        {
            // Definir los "claims" (información) que queremos en el token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, usuario.Nombrecompleto),
                new Claim(ClaimTypes.Email, usuario.Correo),
                // Puedes agregar más información si lo deseas
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"])); // Clave secreta
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Crear el token
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],    // Emisor
                audience: _configuration["Jwt:Audience"], // Audiencia
                claims: claims,                           // Claims
                expires: DateTime.Now.AddHours(1),        // El token expira en 1 hora
                signingCredentials: creds                 // Firmado con la clave secreta
            );

            return new JwtSecurityTokenHandler().WriteToken(token); // Convertimos el token a string y lo retornamos
        }
    }
}
