using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FluentValidation;
using FluentValidation.AspNetCore;
using SistemaApoyo.BLL.Validaciones;
using SistemaApoyo.IOC;
using SistemaApoyo.BLL.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Inyección de dependencias
builder.Services.InyectarDependencias(builder.Configuration);

builder.Services.AddControllers();

// Configuración de CORS (permitir solo el origen específico del frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("_myCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
               // Cambia a HTTPS si es necesario
               .AllowAnyMethod()
              .AllowAnyHeader();
    });

    // Se añade otra política para permitir cualquier origen, método y encabezado
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// Configuración de Fluent Validation
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

// Agregar Swagger para documentación de API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuración en entorno de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Aplicar CORS antes de manejar las solicitudes
app.UseCors("_myCorsPolicy");  // Usar la política específica para el frontend

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.UseStaticFiles();



// Configuración de SignalR (WebSockets)
app.MapHub<ChatHub>("/chatHub");

app.Run();
