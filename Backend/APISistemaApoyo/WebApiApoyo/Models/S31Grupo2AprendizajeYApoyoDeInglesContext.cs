using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApiApoyo.Models;

public partial class S31Grupo2AprendizajeYApoyoDeInglesContext : DbContext
{
    public S31Grupo2AprendizajeYApoyoDeInglesContext()
    {
    }

    public S31Grupo2AprendizajeYApoyoDeInglesContext(DbContextOptions<S31Grupo2AprendizajeYApoyoDeInglesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=186.139.240.137;Port=14998;Database=S31-Grupo2 - Aprendizaje-y-apoyo-de-ingles;Username=postgres;Password=tallersoft600");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Idusuario).HasName("Usuario_pkey");

            entity.ToTable("usuario");

            entity.Property(e => e.Idusuario)
                .ValueGeneratedNever()
                .HasColumnName("idusuario");
            entity.Property(e => e.AutProf).HasColumnName("autProf");
            entity.Property(e => e.ContraseñaHash)
                .HasColumnType("character varying")
                .HasColumnName("contraseña_hash");
            entity.Property(e => e.Correo)
                .HasColumnType("character varying")
                .HasColumnName("correo");
            entity.Property(e => e.Fecharegistro).HasColumnName("fecharegistro");
            entity.Property(e => e.Idnivel).HasColumnName("idnivel");
            entity.Property(e => e.Idrol).HasColumnName("idrol");
            entity.Property(e => e.Nombrecompleto)
                .HasColumnType("character varying")
                .HasColumnName("nombrecompleto");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
