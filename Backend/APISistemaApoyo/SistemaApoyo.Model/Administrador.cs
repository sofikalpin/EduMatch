using System;
using System.Collections.Generic;

namespace SistemaApoyo.Model;

public partial class Administrador
{
    public int Idadmin { get; set; }

    public string? Nombre { get; set; }

    public string? Correo { get; set; }

    public string? Clave { get; set; }
}
