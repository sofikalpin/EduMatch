import React, { useState } from 'react';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userType: '',
        nivel: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        linkedin: '',
        resumeFile: null,
    });
    const [errors, setErrors] = useState({
        userType: '',
        nivel: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        linkedin: '',
        resumeFile: '',
    });

    const handleNext = () => {
        const isValid = validateStep();
        console.log("Errores:", errors); // Verifica los errores

        if (isValid) {
            setStep(step + 1);
        } else {
            console.log("Hay errores, no se puede avanzar"); // Mensaje para depurar
        }
    };

    const validateStep = () => {
        let newErrors = { ...errors };

        if (step === 1) {
            if (!formData.userType) {
                newErrors.userType = "Debes seleccionar un tipo de usuario";
            } else {
                newErrors.userType = "";
            }
            if (!formData.nivel) {
                newErrors.nivel = "Debes seleccionar tu nivel";
            } else {
                newErrors.nivel = "";
            }
        } else {
            newErrors.userType = "";
            newErrors.nivel = "";
        }

        if (step === 2 && !formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        } else {
            newErrors.name = "";
        }

        if (step === 2 && !formData.email.trim()) {
            newErrors.email = "El correo electrónico es obligatorio";
        } else {
            newErrors.email = "";
        }

        if (step === 3 && !formData.password.trim()) {
            newErrors.password = "La contraseña es obligatoria";
        } else {
            newErrors.password = "";
        }

        if (step === 3 && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        } else {
            newErrors.confirmPassword = "";
        }

        if (step === 1 && formData.userType === "profesor") {
            if (!formData.linkedin.trim()) {
                newErrors.linkedin = "Debes ingresar tu perfil de LinkedIn";
            } else {
                newErrors.linkedin = "";
            }

            if (formData.userType === "profesor" && !formData.resumeFile) {
                newErrors.resumeFile = "Debes cargar tu CV";
            } else {
                newErrors.resumeFile = "";
            }
        }

        setErrors(newErrors);
        console.log("Errores después de la validación:", newErrors); // Agregado para depuración
        return !Object.values(newErrors).some((error) => error);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            {step === 1 && (
                <div>
                    <h2>Paso 1: Selecciona tu tipo de usuario</h2>
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un tipo</option>
                        <option value="estudiante">Estudiante</option>
                        <option value="profesor">Profesor</option>
                    </select>
                    {errors.userType && <p>{errors.userType}</p>}

                    <h3>Selecciona tu nivel:</h3>
                    <select
                        name="nivel"
                        value={formData.nivel}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un nivel</option>
                        <option value="principiante">Principiante</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                    </select>
                    {errors.nivel && <p>{errors.nivel}</p>}
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Paso 2: Información personal</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p>{errors.name}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Paso 3: Contraseña</h2>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
            )}

            {step === 1 && formData.userType === "profesor" && (
                <div>
                    <h3>Profesor: Agrega tu perfil de LinkedIn:</h3>
                    <input
                        type="text"
                        name="linkedin"
                        placeholder="Perfil de LinkedIn"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                    {errors.linkedin && <p>{errors.linkedin}</p>}

                    <h3>Sube tu CV:</h3>
                    <input
                        type="file"
                        name="resumeFile"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                resumeFile: e.target.files[0],
                            }))
                        }
                    />
                    {errors.resumeFile && <p>{errors.resumeFile}</p>}
                </div>
            )}

            <button onClick={handleNext}>Continuar</button>
        </div>
    );
};

export default MultiStepForm;
