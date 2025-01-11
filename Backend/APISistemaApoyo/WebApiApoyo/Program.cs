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
<<<<<<< HEAD
        policy.WithOrigins("http://localhost:3000") // URL del frontend
              .AllowAnyMethod()
              .AllowAnyHeader();
    });

    // Política CORS general
    options.AddPolicy("AllowAllOrigins", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader()
    );
=======
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
>>>>>>> a2996b940a362c0f3b2d0fd3fa321fe6969c95e1
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
// Configuración en entorno de desarrollo
// Aplicar política CORS (elige una según lo necesites)
=======
<<<<<<< HEAD
// Configuración para entornos de desarrollo
=======


// Configuración en entorno de desarrollo
>>>>>>> fe6a432d2794d8c048848fa09d19988892e8f5ec
>>>>>>> a2996b940a362c0f3b2d0fd3fa321fe6969c95e1
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
<<<<<<< HEAD

    app.UseCors("AllowAllOrigins");
}
else { 
    app.UseCors("AllowReactApp");
=======
}
else
{
    app.UseHsts();
>>>>>>> a2996b940a362c0f3b2d0fd3fa321fe6969c95e1
}

app.UseHttpsRedirection();

// Configuración del CORS
app.UseCors("AllowAllOrigins");

// Usar autenticación JWT
app.UseAuthentication();

// Usar autorización
app.UseAuthorization();
<<<<<<< HEAD
=======

// Mapear controladores y Hub de SignalR
>>>>>>> a2996b940a362c0f3b2d0fd3fa321fe6969c95e1
app.MapControllers();
app.MapHub<ChatHub>("/chatHub");

app.Run();
