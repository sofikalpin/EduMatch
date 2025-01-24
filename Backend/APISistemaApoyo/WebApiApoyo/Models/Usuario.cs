using System;
using System.Collections.Generic;

namespace WebApiApoyo.Models;

public partial class Usuario
{
    public int Idusuario { get; set; }

    public string Nombrecompleto { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string ContraseñaHash { get; set; } = null!;

    public DateOnly Fecharegistro { get; set; }

    public int Idnivel { get; set; }

    public int Idrol { get; set; }

    public bool? AutProf { get; set; }

    public virtual ICollection<Actividad> Actividads { get; set; } = new List<Actividad>();

    public virtual ICollection<Articulo> Articulos { get; set; } = new List<Articulo>();

    public virtual ICollection<Chat> ChatIdusuario1Navigations { get; set; } = new List<Chat>();

    public virtual ICollection<Chat> ChatIdusuario2Navigations { get; set; } = new List<Chat>();

    public virtual ICollection<Consultum> Consulta { get; set; } = new List<Consultum>();

    public virtual ICollection<Examan> Examen { get; set; } = new List<Examan>();

    public virtual ICollection<Foro> Foros { get; set; } = new List<Foro>();

    public virtual Nivel IdnivelNavigation { get; set; } = null!;

    public virtual Rol IdrolNavigation { get; set; } = null!;

    public virtual ICollection<Mensaje> Mensajes { get; set; } = new List<Mensaje>();

    public virtual ICollection<Respuestum> Respuesta { get; set; } = new List<Respuestum>();
}
