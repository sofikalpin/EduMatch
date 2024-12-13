﻿using System;
using System.Collections.Generic;

namespace WebApiApoyo.Models;

public partial class Foro
{
    public int Idforo { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public int Idconsulta { get; set; }

    public DateOnly Fecha { get; set; }

    public int Idusuario { get; set; }

    public int? Idnivel { get; set; }

    public virtual Consultum IdconsultaNavigation { get; set; } = null!;

    public virtual Nivel? IdnivelNavigation { get; set; }

    public virtual Usuario IdusuarioNavigation { get; set; } = null!;
}
