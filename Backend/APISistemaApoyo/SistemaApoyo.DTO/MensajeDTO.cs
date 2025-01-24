using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class MensajeDTO
    {
      [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public int Idmensaje { get; set; }
      
      public string? Contenido { get; set; }
      public DateOnly? FechaEnvio { get; set; }

      public int Idchat { get; set; }
      public int Idusuario { get; set; }  

    }
}

