using System;
using System.Collections.Generic;

namespace SistemaApoyo.Model.Models;

public partial class Rol
{
    public int Idrol { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Menurol> Menurols { get; set; } = new List<Menurol>();

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
