using SistemaApoyo.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IReseñaAlumnoService
    {
        Task<IEnumerable<ReseñaAlumnoDTO>> ObtenerTodasAsync();
        Task<ReseñaAlumnoDTO> ObtenerPorIdAsync(int id);
        Task<bool> CrearAsync(CrearReseñaAlumnoDTO nuevaReseñaDto);
        Task<bool> ActualizarAsync(ReseñaAlumnoDTO reseñaDto);
        Task<bool> EliminarAsync(int id);


    }
}
