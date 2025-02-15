using AutoMapper;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaApoyo.BLL.Servicios
{
    public class ReseñaAlumnoService : IReseñaAlumnoService
    {
        private readonly IGenericRepository<Reseña> _resenaRepositorio;
        private readonly IMapper _mapper;

        public ReseñaAlumnoService(IGenericRepository<Reseña> resenaRepositorio, IMapper mapper)
        {
            _resenaRepositorio = resenaRepositorio;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReseñaAlumnoDTO>> ObtenerTodasAsync()
        {
            try
            {
                var consulta = await _resenaRepositorio.Consultar();
                var reseñas = await consulta.OrderByDescending(r => r.Fecha).ToListAsync();
                return _mapper.Map<IEnumerable<ReseñaAlumnoDTO>>(reseñas);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las reseñas.", ex);
            }
        }

        public async Task<ReseñaAlumnoDTO> ObtenerPorIdAsync(int id)
        {
            try
            {
                var reseña = await _resenaRepositorio.Obtener(r => r.Id == id);
                if (reseña == null)
                    throw new Exception("Reseña no encontrada.");

                return _mapper.Map<ReseñaAlumnoDTO>(reseña);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la reseña por ID.", ex);
            }
        }

        public async Task<bool> CrearAsync(CrearReseñaAlumnoDTO nuevaReseñaDto)
        {
            try
            {
                var nuevaReseña = new Reseña
                {
                    Texto = nuevaReseñaDto.Texto,
                    Rating = nuevaReseñaDto.Rating,
                    Fecha = DateTime.UtcNow
                };

                await _resenaRepositorio.Crear(nuevaReseña);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear la reseña.", ex);
            }
        }

        public async Task<bool> ActualizarAsync(ReseñaAlumnoDTO reseñaDto)
        {
            try
            {
                var reseñaExistente = await _resenaRepositorio.Obtener(r => r.Id == reseñaDto.Id);
                if (reseñaExistente == null)
                    throw new Exception("Reseña no encontrada.");

                _mapper.Map(reseñaDto, reseñaExistente);
                await _resenaRepositorio.Editar(reseñaExistente);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar la reseña.", ex);
            }
        }

        public async Task<bool> EliminarAsync(int id)
        {
            try
            {
                var reseñaExistente = await _resenaRepositorio.Obtener(r => r.Id == id);
                if (reseñaExistente == null)
                    throw new Exception("Reseña no encontrada.");

                return await _resenaRepositorio.Eliminar(reseñaExistente);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar la reseña.", ex);
            }
        }
    }
}
