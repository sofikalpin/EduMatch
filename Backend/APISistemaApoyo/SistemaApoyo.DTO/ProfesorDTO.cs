using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class ProfesorDTO
    {
        public int Id { get; set; }
        public string NombreCompleto { get; set; }
        public bool IsAutorizado { get; set; }
        public List<ReseñaAlumnoDTO> Opiniones { get; set; } = new List<OpinionDTO>();
    }
}
