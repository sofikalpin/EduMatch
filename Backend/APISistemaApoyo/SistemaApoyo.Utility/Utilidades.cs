using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SistemaApoyo.Model;
using System.Security.Cryptography;


namespace SistemaApoyo.Utility
{
    public class Utilidades
    {


        private readonly IConfiguration _configuration;

        public Utilidades(IConfiguration configuration)
        {

            _configuration = configuration;
        }

        public string encriptarSHA256(String texto)
        {


            using (SHA256 sha256Hash = SHA256.Create())
            {
                //computar el hash
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(texto));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2")); // "x2" para formato hexadecimal en minúsculas
                }
                return builder.ToString();

            }
        }

        //generamos los token
        public string generarJWT(Administrador administrador)
        {
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, administrador.Idadmin.ToString()),
        new Claim(ClaimTypes.Email, administrador.Correo ?? ""),
        new Claim(ClaimTypes.Name, administrador.Nombre ?? ""),
        new Claim(ClaimTypes.Role, "Administrador")
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
