using System;
using System.Collections.Generic;

namespace SistemaApoyo.Model.Models;

public partial class Examen
{
    public int Idexamen { get; set; }

    public string Titulo { get; set; } = null!;

    public int Duracion { get; set; }

    public string? Calificacion { get; set; }

    public int? Idusuario { get; set; }

    public TimeOnly? HoraFin { get; set; }

    public TimeOnly? HoraIni { get; set; }

    public virtual Usuario? IdusuarioNavigation { get; set; }
}
