using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FluentValidation;
using FluentValidation.AspNetCore;
using SistemaApoyo.BLL.Validaciones;
using SistemaApoyo.IOC;
using SistemaApoyo.BLL.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Inyecci�n de dependencias
builder.Services.InyectarDependencias(builder.Configuration);

// Agregar Fluent Validation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<ActividadValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ArticuloValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ChatValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ConsultaValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ExamenValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ForoValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<LoginValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<MensajeValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<RespuestaValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<SesionValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UsuarioValidator>();

// Configuraci�n de CORS
builder.Services.AddCors(options =>
{
    // Pol�tica CORS espec�fica para la aplicaci�n React
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3001/") // URL del frontend
              .AllowAnyHeader()
              .AllowAnyMethod();
    });

    // Pol�tica CORS general
    options.AddPolicy("AllowAllOrigins", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuraci�n en entorno de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Aplicar pol�tica CORS (elige una seg�n lo necesites)
app.UseCors("AllowAllOrigins"); // O "AllowReactApp" si solo quieres permitir React

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

// Configuraci�n de SignalR (real-time chat)
app.MapHub<ChatHub>("/chatHub");

app.Run();
