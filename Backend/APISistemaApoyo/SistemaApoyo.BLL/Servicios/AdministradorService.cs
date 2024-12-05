using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.BLL.Servicios
{
    public class AdministradorService : IAdministrador
    {
        private readonly IGenericRepository<Usuario> _usuarioRepositorio;
        private readonly IMapper _mapper;

        public AdministradorService(IGenericRepository<Usuario> usuarioRepositorio, IMapper mapper)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _mapper = mapper;
        }

        public async Task<List<UsuarioDTO>> ListaTotal() 
        {
            try
            {
                var consulta = await _usuarioRepositorio.Consultar();
                var listaUsuarios = await consulta.ToListAsync();
                return _mapper.Map<List<UsuarioDTO>>(listaUsuarios);
            }
            catch (Exception ex) 
            {
                throw new Exception("Error al obtener los usuarios.", ex);
            }
        }

        public async Task<List<UsuarioDTO>> ListaRol(int numero_rol) 
        {
            try
            {
                var Usuarioquery = await _usuarioRepositorio.Consultar();
                if (numero_rol != null && numero_rol >= 1 && numero_rol <= 3)
                {
                    Usuarioquery = Usuarioquery.Where(u => u.Idrol == numero_rol);
                }

                var listaresultado = await Usuarioquery.ToListAsync();
                return _mapper.Map<List<UsuarioDTO>>(listaresultado);
            }
            catch (Exception ex) 
            {
                throw new Exception("Error al obtener los usuarios por rol.", ex);
            }
        }

        public async Task<List<UsuarioDTO>> ConsultaNombre(int rol, string nombre)
        {
            try
            {
                var usuarioquery = await _usuarioRepositorio.Consultar();
                if (!string.IsNullOrEmpty(nombre) && rol >= 1 && rol <= 3)
                {
                    usuarioquery = usuarioquery
                    .Where(u => u.Idrol == rol && EF.Functions.Like(u.Nombrecompleto, $"%{nombre}%")); // Búsqueda parcial
                }

                var listaResultado = await usuarioquery.ToListAsync();

                // Mapear resultados a DTO
                return _mapper.Map<List<UsuarioDTO>>(listaResultado);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la actividad por nombre y id.", ex);
            }
        }

        public async Task<List<UsuarioDTO>> ConsultaNivel(int rol, int nivel)
        {
            try
            {
                var Usuarioquery = await _usuarioRepositorio.Consultar();
                if (rol != null && rol >= 1 && rol <= 3 && nivel != null)
                {
                    Usuarioquery = Usuarioquery.Where(u => u.Idrol == rol && u.Idnivel == nivel);
                }

                var listaresultado = await Usuarioquery.ToListAsync();
                return _mapper.Map<List<UsuarioDTO>>(listaresultado);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la actividad por nivel y id.", ex);
            }
        }

        public async Task<UsuarioDTO> ObtenerUsuarioId(int id)
        {
            try
            {
                var usuario = await _usuarioRepositorio.Obtener(u => u.Idusuario == id);
                if (usuario == null)
                {
                    throw new InvalidOperationException("Usuario no encontrada.");
                }
                return _mapper.Map<UsuarioDTO>(usuario);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la usuario por id.", ex);
            }

        }

        public async Task<bool> CrearUsuario(UsuarioDTO usuario)
        {
            try
            {
                var usuario1 = _mapper.Map<Usuario>(usuario);
                await _usuarioRepositorio.Crear(usuario1);
                return true;

            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear el usuario.", ex);
            }
        }

        public async Task<bool> ActualizarUsuario(UsuarioDTO usuario)
        {
            try
            {
                var usuarioModelo = _mapper.Map<Usuario>(usuario);
                var usuarioEncontrado = await _usuarioRepositorio.Obtener(a => a.Idusuario == usuarioModelo.Idusuario);
                if (usuarioEncontrado == null)
                {
                    throw new TaskCanceledException("El usuario no existe");
                }
                _mapper.Map(usuario, usuarioEncontrado);
                await _usuarioRepositorio.Editar(usuarioEncontrado);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el usuario.", ex);
            }
        }

        public async Task<bool> EliminarUsuario(int id)
        {
            try
            {
                var usuarioEncontrado = await _usuarioRepositorio.Obtener(u => u.Idusuario == id);
                if (usuarioEncontrado == null)
                    throw new TaskCanceledException("El usuario no fue encontrado.");

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


        public async Task<bool> AutorizarProfesor(int id) 
        {
            try
            {
                var usuarioBuscado = await _usuarioRepositorio.Obtener(u => u.Idusuario == id);

                if (usuarioBuscado == null)
                {
                    throw new TaskCanceledException("El profesor no existe");
                }

                //usuarioBuscado.ProfesorAutorizado = true;
                await _usuarioRepositorio.Editar(usuarioBuscado);
                return true;
            }
            catch 
            { 
                throw; 
            }
        }
    }
}
