using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using FluentValidation;
using FluentValidation.AspNetCore;
using SistemaApoyo.BLL.Validaciones;
using SistemaApoyo.IOC;
using SistemaApoyo.BLL.Hubs;
<<<<<<< HEAD
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
=======
using Microsoft.EntityFrameworkCore.Design;
>>>>>>> fe6a432d2794d8c048848fa09d19988892e8f5ec

var builder = WebApplication.CreateBuilder(args);

// Inyección de dependencias personalizadas
builder.Services.InyectarDependencias(builder.Configuration);

<<<<<<< HEAD
// Validación con FluentValidation
=======
builder.Services.AddControllers();



// Agregar Fluent Validation
>>>>>>> fe6a432d2794d8c048848fa09d19988892e8f5ec
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssembly(typeof(ActividadValidator).Assembly);

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configuración de autenticación JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
        };
    });

// Agregar controladores y servicios necesarios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

<<<<<<< HEAD
// Configuración para entornos de desarrollo
=======


// Configuración en entorno de desarrollo
>>>>>>> fe6a432d2794d8c048848fa09d19988892e8f5ec
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

// Configuración del CORS
app.UseCors("AllowAllOrigins");

// Usar autenticación JWT
app.UseAuthentication();

// Usar autorización
app.UseAuthorization();

// Mapear controladores y Hub de SignalR
app.MapControllers();
app.MapHub<ChatHub>("/chatHub");

app.Run();
