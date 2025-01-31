using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SistemaApoyo.DTO;


namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IActividadService
    {
        Task<List<ActividadDTO>> ConsultarActividad();
        Task<List<ActividadDTO>> ConsultarporNombre(string nombre);
        Task<ActividadDTO> ObtenerPorId(int id);
    }
}
