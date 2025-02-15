using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class ReseñaDTO
    {
       public int idReseñaP {  get; set; }
        public int idusuario { get; set; }
        public string nombreusuario { get; set; }   
        public string rating { get; set; }
        public string comentario { get; set; }
    }
}
