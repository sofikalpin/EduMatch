using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class CrearReseñaAlumnoDTO
    {
        public string Texto { get; set; }
        public int Rating { get; set; }
        public int ProfesorId { get; set; }
    }
}
