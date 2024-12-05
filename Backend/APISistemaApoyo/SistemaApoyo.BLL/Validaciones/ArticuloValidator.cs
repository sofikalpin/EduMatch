using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using SistemaApoyo.DTO;

namespace SistemaApoyo.BLL.Validaciones
{
    public class ArticuloValidator : AbstractValidator<ArticuloDTO>
    {
        public ArticuloValidator() 
        {
            RuleFor(a => a.Titulo)
                .NotEmpty().WithMessage("El titulo no debe estar en blanco")
                .MaximumLength(100).WithMessage("El titulo no debe tener mas de 100 caracteres");

            RuleFor(a => a.Descripcion)
                .NotEmpty().WithMessage("La descripcion no debe estar en blanco")
                .MinimumLength(30).WithMessage("La descripcion debe tener mas de 30 caracteres");

            RuleFor(a => a.UrlImagen)
                .Must(BeAValidUrl).When(x => !string.IsNullOrEmpty(x.UrlImagen))
                .WithMessage("La URL de la imagen no es válida.");

            RuleFor(a => a.Idusuario)
                .GreaterThan(0).When(x => x.Idusuario.HasValue)
                .WithMessage("El ID del usuario debe ser un valor positivo.");
        }

        //Metodo para validar URLs
        private bool BeAValidUrl(string? url) 
        {
            return Uri.TryCreate(url, UriKind.Absolute, out _);
        }
    }
}
