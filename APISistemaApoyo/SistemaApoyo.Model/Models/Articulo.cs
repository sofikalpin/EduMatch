using System;
using System.Collections.Generic;

namespace SistemaApoyo.Model.Models;

public partial class Articulo
{
    public int Idarticulo { get; set; }

    public string Titulo { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public string? UrlImagen { get; set; }

    public int? Idusuario { get; set; }

    public virtual Usuario? IdusuarioNavigation { get; set; }
}
