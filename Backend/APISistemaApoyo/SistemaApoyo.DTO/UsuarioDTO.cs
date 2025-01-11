using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.DTO
{
    public class UsuarioDTO
    {
        public int Idusuario { get; set; }

        public string Nombrecompleto { get; set; } = null!;

        public string Correo { get; set; } = null!;

        public string ContraseñaHash { get; set; } = null!;

        public int Idnivel { get; set; }

        public int Idrol { get; set; }

        public bool? AutProf {  get; set; }

    }
}
