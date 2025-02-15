using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class ReseñaRespuestaDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }  // Se obtiene de la relación con Usuario
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}
