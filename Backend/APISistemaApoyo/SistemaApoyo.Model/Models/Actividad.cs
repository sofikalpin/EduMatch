using System;
using System.Collections.Generic;

namespace SistemaApoyo.Model.Models;

public partial class Actividad
{
    public int Idactividad { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public int? Idusuario { get; set; }

    public int? Idnivel { get; set; }

    public DateOnly? Fecha { get; set; }

    public virtual Nivel? IdnivelNavigation { get; set; }

    public virtual Usuario? IdusuarioNavigation { get; set; }
}
