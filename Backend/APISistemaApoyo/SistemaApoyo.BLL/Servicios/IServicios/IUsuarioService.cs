using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SistemaApoyo.DTO;



namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IUsuarioService
    {
        
        Task<UsuarioDTO> Crear(UsuarioDTO modelo);
        Task<bool> Editar(UsuarioDTO modelo);
        Task<bool> Eliminar(int id);

        Task<List<UsuarioDTO>> Lista();

        Task<UsuarioDTO> ObtenerUsuarioPorID(int idusuario);
        Task<UsuarioDTO> ObtenerUsuarioPorCorreo(string correo);        
        
        Task<SesionDTO> ValidarCredenciales(string correo, string contrasenaHash);
        string HashContraseña(string contrasena);


        Task<bool> ReestablecerContraseña(string token, string nuevaContraseña);

        Task EnviarCorreoRecuperacion(string correoDestino, string token);
        Task<bool> GenerarTokenRecuperacion(string correo);

    }
}