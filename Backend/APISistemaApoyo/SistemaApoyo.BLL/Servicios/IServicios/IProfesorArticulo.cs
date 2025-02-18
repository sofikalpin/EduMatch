using SistemaApoyo.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SistemaApoyo.Model;

namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IProfesorArticulo
    {
        Task<bool> CrearArticulo(ArticuloDTO articulos);
        Task<bool> ActualizarArticulo(ArticuloDTO articulo);
        Task<bool> EliminarArticulo(int id);
        
        Task<List<ArticuloDTO>> ConsultarArticulo();
        Task<List<ArticuloDTO>> ConsultarporTitulo(string titulo);

        Task<List<ArticuloDTO>> ObteneArticulorPorIdProfesor(int id);
        
    }
}