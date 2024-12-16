using System;
using System.Collections.Generic;

namespace WebApiApoyo.Models;

public partial class Consultum
{
    public int Idconsulta { get; set; }

    public string Contenido { get; set; } = null!;

    public string Titulo { get; set; } = null!;

    public int Idusuario { get; set; }

    public DateTime? Fechahora { get; set; }

    public virtual ICollection<Foro> Foros { get; set; } = new List<Foro>();

    public virtual Usuario IdusuarioNavigation { get; set; } = null!;

    public virtual ICollection<Respuestum> Respuesta { get; set; } = new List<Respuestum>();
}
