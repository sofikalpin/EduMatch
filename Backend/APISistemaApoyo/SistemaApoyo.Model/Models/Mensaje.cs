using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaApoyo.Model.Models;

public partial class Mensaje
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Idmensaje { get; set; }

    public string? Contenido { get; set; }

    public DateOnly? FechaEnvio { get; set; }

    public int Idchat { get; set; }

    public int Idusuario { get; set; }

    public virtual Chat IdchatNavigation { get; set; } = null!;

    public virtual Usuario IdusuarioNavigation { get; set; } = null!;
}
