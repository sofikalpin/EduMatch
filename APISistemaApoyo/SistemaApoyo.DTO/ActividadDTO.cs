using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class ActividadDTO
    {
        public int Idactividad { get; set; }

        public string Nombre { get; set; } = null!;

        public string Descripcion { get; set; } = null!;

        public int? Idusuario { get; set; }

        public int? Idnivel { get; set; }

        public DateOnly? Fecha { get; set; }
    }
}
