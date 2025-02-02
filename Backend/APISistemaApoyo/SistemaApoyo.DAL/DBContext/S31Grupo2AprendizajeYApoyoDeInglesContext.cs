using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SistemaApoyo.Model;

namespace SistemaApoyo.DAL.DBContext {

    public partial class S31Grupo2AprendizajeYApoyoDeInglesContext : DbContext
    {
        public S31Grupo2AprendizajeYApoyoDeInglesContext()
        {
        }

        public S31Grupo2AprendizajeYApoyoDeInglesContext(DbContextOptions<S31Grupo2AprendizajeYApoyoDeInglesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Actividad> Actividads { get; set; }

        public virtual DbSet<Articulo> Articulos { get; set; }

        public virtual DbSet<Chat> Chats { get; set; }

        public virtual DbSet<Consulta> Consulta { get; set; }

        public virtual DbSet<Examen> Examen { get; set; }

        public virtual DbSet<Foro> Foros { get; set; }

        public virtual DbSet<Mensaje> Mensajes { get; set; }

        public virtual DbSet<Menu> Menus { get; set; }

        public virtual DbSet<Menurol> Menurols { get; set; }

        public virtual DbSet<Nivel> Nivels { get; set; }

        public virtual DbSet<Respuesta> Respuesta { get; set; }

        public virtual DbSet<Rol> Rols { get; set; }

        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
            => optionsBuilder.UseNpgsql("Host=186.139.240.137;Port=14998;Database=S31-Grupo2 - Aprendizaje-y-apoyo-de-ingles;Username=postgres;Password=tallersoft600;TrustServerCertificate=True;");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Actividad>(entity =>
            {
                entity.HasKey(e => e.Idactividad).HasName("pk_idActividad");

                entity.ToTable("actividad");

                entity.Property(e => e.Idactividad)
                    .HasDefaultValueSql("nextval('\"Actividad_id_seq\"'::regclass)")
                    .HasColumnName("idactividad");
                entity.Property(e => e.Descripcion)
                    .HasColumnType("character varying")
                    .HasColumnName("descripcion");
                entity.Property(e => e.Fecha).HasColumnName("fecha");
                entity.Property(e => e.Idnivel).HasColumnName("idnivel");
                entity.Property(e => e.Idusuario).HasColumnName("idusuario");
                entity.Property(e => e.Nombre)
                    .HasColumnType("character varying")
                    .HasColumnName("nombre");

                entity.HasOne(d => d.IdnivelNavigation).WithMany(p => p.Actividads)
                    .HasForeignKey(d => d.Idnivel)
                    .HasConstraintName("idnivel");

                entity.HasOne(d => d.IdusuarioNavigation).WithMany(p => p.Actividads)
                    .HasForeignKey(d => d.Idusuario)
                    .HasConstraintName("idusuario");
            });

            modelBuilder.Entity<Articulo>(entity =>
            {
                entity.HasKey(e => e.Idarticulo).HasName("pk_idArticulo");

                entity.ToTable("articulo");

                entity.Property(e => e.Idarticulo)
                    .HasDefaultValueSql("nextval('\"Articulo_id_seq\"'::regclass)")
                    .HasColumnName("idarticulo");
                entity.Property(e => e.Descripcion)
                    .HasColumnType("character varying")
                    .HasColumnName("descripcion");
                entity.Property(e => e.Idnivel).HasColumnName("idnivel");
                entity.Property(e => e.Idusuario).HasColumnName("idusuario");
                entity.Property(e => e.Titulo)
                    .HasColumnType("character varying")
                    .HasColumnName("titulo");
                entity.Property(e => e.UrlImagen)
                    .HasColumnType("character varying")
                    .HasColumnName("url_imagen");

                entity.HasOne(d => d.IdnivelNavigation).WithMany(p => p.Articulos)
                    .HasForeignKey(d => d.Idnivel)
                    .HasConstraintName("idnivel");

                entity.HasOne(d => d.IdusuarioNavigation).WithMany(p => p.Articulos)
                    .HasForeignKey(d => d.Idusuario)
                    .HasConstraintName("idusuario");
            });

            modelBuilder.Entity<Chat>(entity =>
            {
                entity.HasKey(e => e.Idchat).HasName("pk_idChat");

                entity.ToTable("chat");

                entity.Property(e => e.Idchat)
                    .HasDefaultValueSql("nextval('\"Chat_id_seq\"'::regclass)")
                    .HasColumnName("idchat");
                entity.Property(e => e.FechahoraInicio).HasColumnName("fechahora_inicio");
                entity.Property(e => e.Idusuario1).HasColumnName("idusuario1");
                entity.Property(e => e.Idusuario2).HasColumnName("idusuario2");

                entity.HasOne(d => d.Idusuario1Navigation).WithMany(p => p.ChatIdusuario1Navigations)
                    .HasForeignKey(d => d.Idusuario1)
                    .HasConstraintName("idusuario1");

                entity.HasOne(d => d.Idusuario2Navigation).WithMany(p => p.ChatIdusuario2Navigations)
                    .HasForeignKey(d => d.Idusuario2)
                    .HasConstraintName("idusuario2");
            });

            modelBuilder.Entity<Consulta>(entity =>
            {
                entity.HasKey(e => e.Idconsulta).HasName("pk_idConsulta");

                entity.ToTable("consulta");

                entity.Property(e => e.Idconsulta)
                    .HasDefaultValueSql("nextval('\"Consulta_id_seq\"'::regclass)")
                    .HasColumnName("idconsulta");
                entity.Property(e => e.Contenido)
                    .HasColumnType("character varying")
                    .HasColumnName("contenido");
                entity.Property(e => e.Fechahora).HasColumnName("fechahora");
                entity.Property(e => e.Idusuario).HasColumnName("idusuario");
                entity.Property(e => e.Titulo)
                    .HasColumnType("character varying")
                    .HasColumnName("titulo");

                entity.HasOne(d => d.IdusuarioNavigation).WithMany(p => p.Consulta)
                    .HasForeignKey(d => d.Idusuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idusuario");
            });

            modelBuilder.Entity<Examen>(entity =>
            {
                entity.HasKey(e => e.Idexamen).HasName("pk_idExamen");

                entity.ToTable("examen");

                entity.Property(e => e.Idexamen)
                    .HasDefaultValueSql("nextval('\"Examen_id_seq\"'::regclass)")
                    .HasColumnName("idexamen");
                entity.Property(e => e.Calificacion)
                    .HasColumnType("character varying")
                    .HasColumnName("calificacion");
                entity.Property(e => e.Duracion).HasColumnName("duracion");
                entity.Property(e => e.HoraFin).HasColumnName("hora_fin");
                entity.Property(e => e.HoraIni).HasColumnName("hora_ini");
                entity.Property(e => e.Idnivel).HasColumnName("idnivel");
                entity.Property(e => e.Idusuario).HasColumnName("idusuario");
                entity.Property(e => e.Titulo)
                    .HasColumnType("character varying")
                    .HasColumnName("titulo");

                entity.HasOne(d => d.IdnivelNavigation).WithMany(p => p.Examen)
                    .HasForeignKey(d => d.Idnivel)
                    .HasConstraintName("idnivel");

                entity.HasOne(d => d.IdusuarioNavigation).WithMany(p => p.Examen)
                    .HasForeignKey(d => d.Idusuario)
                    .HasConstraintName("idusuario");
            });

            modelBuilder.Entity<Foro>(entity =>
            {
                entity.HasKey(e => e.Idforo).HasName("pk_idForo");

                entity.ToTable("foro");

                entity.Property(e => e.Idforo)
                    .HasDefaultValueSql("nextval('\"Foro_id_seq\"'::regclass)")
                    .HasColumnName("idforo");
                entity.Property(e => e.Descripcion)
                    .HasColumnType("character varying")
                    .HasColumnName("descripcion");
                entity.Property(e => e.Fecha).HasColumnName("fecha");
                entity.Property(e => e.Idconsulta).HasColumnName("idconsulta");
                entity.Property(e => e.Idnivel).HasColumnName("idnivel");
                entity.Property(e => e.Idusuario).HasColumnName("idusuario");
                entity.Property(e => e.Nombre)
                    .HasColumnType("character varying")
                    .HasColumnName("nombre");

                entity.HasOne(d => d.IdconsultaNavigation).WithMany(p => p.Foros)
                    .HasForeignKey(d => d.Idconsulta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idconsulta");

                entity.HasOne(d => d.IdnivelNavigation).WithMany(p => p.Foros)
                    .HasForeignKey(d => d.Idnivel)
                    .HasConstraintName("idnivel");

                entity.HasOne(d => d.IdusuarioNavigation).WithMany(p => p.Foros)
                    .HasForeignKey(d => d.Idusuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idusuario");
            });

            modelBuilder.Entity<Mensaje>(entity =>
            {
                entity.HasKey(e => e.Idmensaje).HasName("pk_mensaje");

                entity.ToTable("mensaje");

                entity.Property(e => e.Idmensaje)
                    .HasDefaultValueSql("nextval('autoincrementoidmensaje'::regclass)")
                    .HasColumnName("idmensaje");
                entity.Property(e => e.Contenido)
                    .HasColumnType("character varying")
                    .HasColumnName("contenido");
                entity.Property(e => e.FechaEnvio).HasColumnName("fecha_envio");
                entity.Property(e => e.Idchat).HasColumnName("idchat");
                entity.Property(e => e.Idusuario).HasColumnName("idusuario");

                entity.HasOne(d => d.IdchatNavigation).WithMany(p => p.Mensajes)
                    .HasForeignKey(d => d.Idchat)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idchat");

                entity.HasOne(d => d.IdusuarioNavigation).WithMany(p => p.Mensajes)
                    .HasForeignKey(d => d.Idusuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idusuario");
            });

            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasKey(e => e.Idmenu).HasName("Menu_pkey");

                entity.ToTable("menu");

                entity.Property(e => e.Idmenu)
                    .ValueGeneratedNever()
                    .HasColumnName("idmenu");
                entity.Property(e => e.Icono)
                    .HasColumnType("character varying")
                    .HasColumnName("icono");
                entity.Property(e => e.Nombre)
                    .HasColumnType("character varying")
                    .HasColumnName("nombre");
                entity.Property(e => e.Url)
                    .HasColumnType("character varying")
                    .HasColumnName("url");
            });

            modelBuilder.Entity<Menurol>(entity =>
            {
                entity.HasKey(e => e.Idmenurol).HasName("MenuRol_pkey");

                entity.ToTable("menurol");

                entity.Property(e => e.Idmenurol)
                    .ValueGeneratedNever()
                    .HasColumnName("idmenurol");
                entity.Property(e => e.Idmenu).HasColumnName("idmenu");
                entity.Property(e => e.Idrol).HasColumnName("idrol");

                entity.HasOne(d => d.IdmenuNavigation).WithMany(p => p.Menurols)
                    .HasForeignKey(d => d.Idmenu)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idmunu");

                entity.HasOne(d => d.IdrolNavigation).WithMany(p => p.Menurols)
                    .HasForeignKey(d => d.Idrol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idrol");
            });

            modelBuilder.Entity<Nivel>(entity =>
            {
                entity.HasKey(e => e.Idnivel).HasName("pk_idNivel");

                entity.ToTable("nivel");

                entity.Property(e => e.Idnivel)
                    .HasDefaultValueSql("nextval('\"Nivel_id_seq\"'::regclass)")
                    .HasColumnName("idnivel");
                entity.Property(e => e.Descripcion)
                    .HasColumnType("character varying")
                    .HasColumnName("descripcion");
            });

            modelBuilder.Entity<Respuesta>(entity =>
            {
                entity.HasKey(e => e.Idrespuesta).HasName("pk_idRespuesta");

                entity.ToTable("respuesta");

                entity.Property(e => e.Idrespuesta)
                    .HasDefaultValueSql("nextval('\"Respuesta_id_seq\"'::regclass)")
                    .HasColumnName("idrespuesta");
                entity.Property(e => e.Contenido)
                    .HasColumnType("character varying")
                    .HasColumnName("contenido");
                entity.Property(e => e.Fechahora).HasColumnName("fechahora");
                entity.Property(e => e.Idconsulta).HasColumnName("idconsulta");
                entity.Property(e => e.Idusuario).HasColumnName("idusuario");

                entity.HasOne(d => d.IdconsultaNavigation).WithMany(p => p.Respuesta)
                    .HasForeignKey(d => d.Idconsulta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idconsulta");

                entity.HasOne(d => d.IdusuarioNavigation).WithMany(p => p.Respuesta)
                    .HasForeignKey(d => d.Idusuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idusuario");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasKey(e => e.Idrol).HasName("Rol_pkey");

                entity.ToTable("rol");

                entity.Property(e => e.Idrol)
                    .ValueGeneratedNever()
                    .HasColumnName("idrol");
                entity.Property(e => e.Nombre)
                    .HasColumnType("character varying")
                    .HasColumnName("nombre");
            });

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
                entity.Property(e => e.CvRuta)
                    .HasColumnType("character varying")
                    .HasColumnName("cvRuta");
                entity.Property(e => e.Fecharegistro).HasColumnName("fecharegistro");
                entity.Property(e => e.Idnivel).HasColumnName("idnivel");
                entity.Property(e => e.Idrol).HasColumnName("idrol");
                entity.Property(e => e.Nombrecompleto)
                    .HasColumnType("character varying")
                    .HasColumnName("nombrecompleto");
                entity.Property(e => e.TokenRecuperacion).HasColumnType("character varying");

                entity.HasOne(d => d.IdnivelNavigation).WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.Idnivel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idnivel");

                entity.HasOne(d => d.IdrolNavigation).WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.Idrol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("idrol");
            });
            modelBuilder.HasSequence("autoincrementoidmensaje").StartsAt(15L);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}