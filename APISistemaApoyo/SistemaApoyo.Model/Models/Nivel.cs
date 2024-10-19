using System;
using System.Collections.Generic;

namespace SistemaApoyo.Model.Models;

public partial class Nivel
{
    public int Idnivel { get; set; }

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<Actividad> Actividads { get; set; } = new List<Actividad>();

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
