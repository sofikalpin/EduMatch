﻿using FluentValidation;
using SistemaApoyo.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.BLL.Validaciones
{
    public class ExamenValidator : AbstractValidator<ExamenDTO>
    {
        public ExamenValidator() 
        {
            RuleFor(e => e.Titulo)
                .NotEmpty().WithMessage("El examen debe tener un titulo")
                .MaximumLength(30).WithMessage("El titulo del examen tiene debe tener como maximo 30 caracteres");

            RuleFor(e => e.Duracion)
                .GreaterThan(0).WithMessage("La duración del examen debe ser mayor a cero.");

            RuleFor(e => e.Calificacion)
                .Matches(@"^[A-Z][a-z]{1}$").When(x => !string.IsNullOrEmpty(x.Calificacion))
                .WithMessage("La calificación debe tener un valor.");

            RuleFor(e => e.Idusuario)
                .NotNull().WithMessage("El Id usuario es obligatorio.");

            RuleFor(e => e.HoraFin)
                .NotEmpty().WithMessage("La hora de finalizacion es obligatoria.");

            RuleFor(e => e.HoraIni)
                .NotEmpty().WithMessage("La hora de comienzo es obligatoria");

            RuleFor(e => e.Idnivel)
                .NotNull().WithMessage("El Id usuario es obligatorio.");

        }
    }
}