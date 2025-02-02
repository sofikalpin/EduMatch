using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace SistemaApoyo.BLL.Servicios
{
    public class ForoService : IForoService
    {
        private readonly IGenericRepository<Foro> _foroRepositorio;
        private readonly IMapper _mapper;

        public ForoService(IGenericRepository<Foro> foroRepositorio, IMapper mapper)
        {
            _foroRepositorio = foroRepositorio;
            _mapper = mapper;
        }

        public async Task<List<ForoDTO>> ConsultarForos()
        {
            try
            {
                var foro = await _foroRepositorio.Consultar();
                var listaforo = await foro.ToListAsync();
                return _mapper.Map<List<ForoDTO>>(listaforo);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la lista de foros.", ex);
            }
        }
        public async Task<List<ForoDTO>> ConsultarPorNombre(string nombre)
        {
            try
            {
                var Actividadquery = await _foroRepositorio.Consultar();
                if (!string.IsNullOrEmpty(nombre))
                {
                    Actividadquery = Actividadquery.Where(v => v.Nombre == nombre);
                }

                var listaResultado = await Actividadquery.ToListAsync();
                return _mapper.Map<List<ForoDTO>>(listaResultado);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el foro por nombre.", ex);
            }
        }

        public async Task<ForoDTO> ObtenerForoPorId(int id)
        {
            try
            {
                var foro = await _foroRepositorio.Obtener(c => c.Idforo == id);
                if (foro == null)
                {
                    throw new InvalidOperationException("Foro no encontrado.");
                }

                return _mapper.Map<ForoDTO>(foro);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el foro por id.", ex);
            }
        }
        public async Task<bool> CrearForo(ForoDTO foros)
        {
            try
            {
                var foro = _mapper.Map<Foro>(foros);
                await _foroRepositorio.Crear(foro);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear el foro.", ex);
            }
        }


        public async Task<bool> ActualizarForo(ForoDTO foro)
        {
            try
            {
                var foroExistente = await _foroRepositorio.Obtener(c => c.Idforo == foro.Idforo);
                if (foroExistente == null)
                {
                    throw new InvalidOperationException("Foro no encontrado.");
                }

                _mapper.Map(foro, foroExistente);
                await _foroRepositorio.Editar(foroExistente);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el foro.", ex);
            }
        }

        


    }
}