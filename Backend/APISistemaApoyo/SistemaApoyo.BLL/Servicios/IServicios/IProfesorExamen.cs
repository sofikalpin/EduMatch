using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SistemaApoyo.DTO;


namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IProfesorExamen
    {
        Task<bool> CrearExamen(ExamenDTO examenes);
        Task<bool> ActualizarExamen(ExamenDTO examen);
        Task<bool> EliminarExamen(int id);
        
        Task<List<ExamenDTO>> ConsultarExamen();
        Task<List<ExamenDTO>> ConsultarPorTitulo(string titulo);

        Task<List<ExamenDTO>> ObteneExamenrPorIdProfesor(int id);

    }
}