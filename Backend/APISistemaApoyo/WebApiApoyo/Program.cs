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

builder.Services.AddControllers();

// Configuraci�n de CORS (permitir solo el origen espec�fico del frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("_myCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
               // Cambia a HTTPS si es necesario
               .AllowAnyMethod()
              .AllowAnyHeader();
    });

    // Se a�ade otra pol�tica para permitir cualquier origen, m�todo y encabezado
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// Configuraci�n de Fluent Validation
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

// Agregar Swagger para documentaci�n de API
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

// Aplicar CORS antes de manejar las solicitudes
app.UseCors("_myCorsPolicy");  // Usar la pol�tica espec�fica para el frontend

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.UseStaticFiles();



// Configuraci�n de SignalR (WebSockets)
app.MapHub<ChatHub>("/chatHub");

app.Run();
