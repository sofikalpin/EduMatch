using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SistemaApoyo.DTO;


namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IForoService
    {
        Task<List<ForoDTO>> ConsultarForos();
        Task<List<ForoDTO>> ConsultarPorNombre(string nombre);
        Task<ForoDTO> ObtenerForoPorId(int id);
        Task<bool> CrearForo(ForoDTO foros);
        Task<bool> ActualizarForo(ForoDTO foro);

    }

}
