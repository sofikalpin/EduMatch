using System;
using System.Collections.Generic;

namespace SistemaApoyo.Model.Models;

public partial class Foro
{
    public int Idforo { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public int Idconsulta { get; set; }

    public DateOnly Fecha { get; set; }

    public int Idusuario { get; set; }

    public virtual Consulta IdconsultaNavigation { get; set; } = null!;

    public virtual Usuario IdusuarioNavigation { get; set; } = null!;
}
