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

namespace SistemaApoyo.BLL.Servicios
{
    public class ConsultaService : IConsultaService
    {
        private readonly IGenericRepository<Consulta> _consultaRepositorio;
        private readonly IMapper _mapper;

        public ConsultaService(IGenericRepository<Consulta> consultaRepositorio, IMapper mapper)
        {
            _consultaRepositorio = consultaRepositorio;
            _mapper = mapper;
        }

        public async Task<List<ConsultaDTO>> ConsultarConsultas()
        {
            try
            {
                var consulta = await _consultaRepositorio.Consultar();
                var listaConsulta = await consulta.ToListAsync();
                return _mapper.Map<List<ConsultaDTO>>(listaConsulta);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la lista de consultas.", ex);
            }
        }

        public async Task<List<ConsultaDTO>> ConsultarPorTitulo(string titulo)
        {
            try
            {
                var Actividadquery = await _consultaRepositorio.Consultar();
                if (!string.IsNullOrEmpty(titulo))
                {
                    Actividadquery = Actividadquery.Where(v => v.Titulo == titulo);
                }

                var listaResultado = await Actividadquery.ToListAsync();
                return _mapper.Map<List<ConsultaDTO>>(listaResultado);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la consulta por título.", ex);
            }
        }

        public async Task<ConsultaDTO> ObtenerConsultaPorId(int id)
        {
            try
            {
                var consulta = await _consultaRepositorio.Obtener(c => c.Idconsulta == id);
                if (consulta == null)
                {
                    throw new InvalidOperationException("Consulta no encontrada.");
                }

                return _mapper.Map<ConsultaDTO>(consulta);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la consulta.", ex);
            }
        }

        public async Task<bool> CrearConsulta(ConsultaDTO consultaDto)
        {
            try
            {
                var consulta = _mapper.Map<Consulta>(consultaDto);
                await _consultaRepositorio.Crear(consulta);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear la consulta.", ex);
            }
        }

        public async Task<bool> ActualizarConsulta(ConsultaDTO consultaDto)
        {
            try
            {
                var consultaExistente = await _consultaRepositorio.Obtener(c => c.Idconsulta == consultaDto.Idconsulta);
                if (consultaExistente == null)
                {
                    throw new InvalidOperationException("Consulta no encontrada.");
                }

                _mapper.Map(consultaDto, consultaExistente);
                await _consultaRepositorio.Editar(consultaExistente);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar la consulta.", ex);
            }
        }
    }
}
