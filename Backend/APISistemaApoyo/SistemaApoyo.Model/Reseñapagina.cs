using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SistemaApoyo.Model;

public partial class Reseñapagina
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdReseñaP { get; set; }

    public int Idusuaro { get; set; }

    public int Rating { get; set; }

    public string Comentario { get; set; } = null!;

    public virtual Usuario IdusuaroNavigation { get; set; } = null!;
}
