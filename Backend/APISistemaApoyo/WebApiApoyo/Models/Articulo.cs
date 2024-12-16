using System;
using System.Collections.Generic;

namespace WebApiApoyo.Models;

public partial class Articulo
{
    public int Idarticulo { get; set; }

    public string Titulo { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public string? UrlImagen { get; set; }

    public int? Idusuario { get; set; }

    public int? Idnivel { get; set; }

    public virtual Nivel? IdnivelNavigation { get; set; }

    public virtual Usuario? IdusuarioNavigation { get; set; }
}
