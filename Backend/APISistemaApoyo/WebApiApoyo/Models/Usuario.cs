using System;
using System.Collections.Generic;

namespace WebApiApoyo.Models;

public partial class Usuario
{
    public int Idusuario { get; set; }

    public string Nombrecompleto { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string ContraseñaHash { get; set; } = null!;

    public DateOnly Fecharegistro { get; set; }

    public int Idnivel { get; set; }

    public int Idrol { get; set; }

    public bool? AutProf { get; set; } = null;
}
