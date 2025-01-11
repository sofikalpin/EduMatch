using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FluentValidation;
using FluentValidation.AspNetCore;
using SistemaApoyo.BLL.Validaciones;
using SistemaApoyo.IOC;
using SistemaApoyo.BLL.Hubs;
using Microsoft.EntityFrameworkCore.Design;

var builder = WebApplication.CreateBuilder(args);

// Inyección de dependencias
builder.Services.InyectarDependencias(builder.Configuration);

builder.Services.AddControllers();

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

// Configuración de CORS
builder.Services.AddCors(options =>
{
    // Política CORS específica para la aplicación React
    options.AddPolicy("AllowReactApp", policy =>
    {
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
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuración en entorno de desarrollo
// Aplicar política CORS (elige una según lo necesites)
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors("AllowAllOrigins");
}
else { 
    app.UseCors("AllowReactApp");
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Configuración de SignalR (real-time chat)
app.MapHub<ChatHub>("/chatHub");

app.Run();
