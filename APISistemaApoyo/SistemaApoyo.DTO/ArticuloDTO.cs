using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class ArticuloDTO
    {
        public int Idarticulo { get; set; }

        public string Titulo { get; set; } = null!;

        public string Descripcion { get; set; } = null!;

        public string? UrlImagen { get; set; }

        public int? Idusuario { get; set; }
    }
}
