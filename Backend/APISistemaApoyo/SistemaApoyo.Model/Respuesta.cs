using System;
using System.Collections.Generic;
using SistemaApoyo.Model;

namespace SistemaApoyo.Model;

public partial class Respuesta
{
    public int Idrespuesta { get; set; }

    public string Contenido { get; set; } = null!;

    public int Idconsulta { get; set; }

    public int Idusuario { get; set; }

    public DateTime? Fechahora { get; set; }

    public virtual Consulta IdconsultaNavigation { get; set; } = null!;

    public virtual Usuario IdusuarioNavigation { get; set; } = null!;

    public object OrderBy(Func<object, object> value)
    {
        throw new NotImplementedException();
    }
}
