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

// Inyecci�n de dependencias personalizadas
builder.Services.InyectarDependencias(builder.Configuration);

<<<<<<< HEAD
// Validaci�n con FluentValidation
=======
builder.Services.AddControllers();

// Agregar Fluent Validation
>>>>>>> fe6a432d2794d8c048848fa09d19988892e8f5ec
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssembly(typeof(ActividadValidator).Assembly);

// Configuraci�n de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
<<<<<<< HEAD
        policy.WithOrigins("http://localhost:3000") // URL del frontend
              .AllowAnyMethod()
              .AllowAnyHeader();
    });

    // Pol�tica CORS general
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

// Configuraci�n de autenticaci�n JWT
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
// Configuraci�n en entorno de desarrollo
// Aplicar pol�tica CORS (elige una seg�n lo necesites)
=======
<<<<<<< HEAD
// Configuraci�n para entornos de desarrollo
=======


// Configuraci�n en entorno de desarrollo
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

// Configuraci�n del CORS
app.UseCors("AllowAllOrigins");

// Usar autenticaci�n JWT
app.UseAuthentication();

// Usar autorizaci�n
app.UseAuthorization();
<<<<<<< HEAD
=======

// Mapear controladores y Hub de SignalR
>>>>>>> a2996b940a362c0f3b2d0fd3fa321fe6969c95e1
app.MapControllers();
app.MapHub<ChatHub>("/chatHub");

app.Run();
