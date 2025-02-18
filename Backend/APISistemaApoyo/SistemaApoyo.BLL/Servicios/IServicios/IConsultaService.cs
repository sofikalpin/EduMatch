using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaApoyo.DTO;

namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IConsultaService
    {
        Task<bool> CrearConsulta(ConsultaDTO consultaDto);        
        
        Task<List<ConsultaDTO>> ConsultarConsultas();
        Task<List<ConsultaDTO>> ConsultarPorTitulo(string titulo);
        Task<List<RespuestaDTO>> RespuestasDeConsultaID(int idConsulta);

        Task<ConsultaDTO> ObtenerConsultaPorId(int id);

    }
}
