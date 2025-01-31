using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class ExamenDTO
    {
        public int Idexamen { get; set; }

        public string Titulo { get; set; } = null!;

        public int Duracion { get; set; }

        public string? Calificacion { get; set; }

        public int? Idusuario { get; set; }
    }
}