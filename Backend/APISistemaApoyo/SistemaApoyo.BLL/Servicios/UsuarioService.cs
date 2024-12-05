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

                string Llave = "ContrasenasHasheadas101";
                string ContrasenaNueva = Crypter.EncryptString(Llave, usuarioModelo.ContraseñaHash);

                usuarioEncontrado.Nombrecompleto = usuarioModelo.Nombrecompleto;
                usuarioEncontrado.Correo = usuarioModelo.Correo;
                usuarioEncontrado.ContraseñaHash = usuarioModelo.ContraseñaHash;
                usuarioEncontrado.Idnivel = usuarioModelo.Idnivel;
                usuarioEncontrado.Idrol = usuarioModelo.Idrol;

                bool respuesta = await _usuarioRepositorio.Editar(usuarioEncontrado);
                if( !respuesta )
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;

            }
            catch 
            {
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
            string Llave = "ContrasenasHasheadas101";
            // Buscar al usuario por su correo
            var usuario = await ObtenerUsuarioPorCorreo(correo);

            if (usuario != null)
            {
                // Verificar la contraseña en texto plano contra el hash almacenado
                string ContrasenaHasheada = usuario.ContrasenaHash;
                string ContrasenaOriginal = Crypter.DecryptString(Llave, ContrasenaHasheada);

                if (ContrasenaOriginal == contrasena)
                {
                    // Credenciales correctas, devolver sesión
                    return new SesionDTO
                    {
                        Correo = usuario.Correo,
                        NombreCompleto = usuario.Nombrecompleto,
                    };
                }
            }
            // Si las credenciales no son correctas, retornar null
            return null;
        }

        public string HashearContrasena(string contrasena)
        {
            string Texto = contrasena;
            string Llave = "ContrasenasHasheadas101";
            string ContrasenaHash = Crypter.EncryptString(Llave, Texto);
            return ContrasenaHash;
        }

    }
}
