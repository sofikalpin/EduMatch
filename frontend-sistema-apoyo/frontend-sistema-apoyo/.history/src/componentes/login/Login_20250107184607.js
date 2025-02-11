import React, { useState } from "react";
import "./Login.css";
import { validateEmail, validatePassword, handleGoogleSignIn, handleLogin, saveUserSession } from "./LoginUtils";  
import logo from "../../logo/LogoInicio.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }

    if (!validatePassword(formData.contraseña)) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await handleLogin({
        email: formData.email,
        password: formData.contraseña
      });
      
      saveUserSession(response.token, formData.rememberMe);
      // Handle successful login (e.g., redirect to dashboard)
      
    } catch (error) {
      setErrors({
        submit: 'Correo electrónico o contraseña inválidos'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const response = await handleGoogleSignIn();
      saveUserSession(response.token, formData.rememberMe);
      // Handle successful Google sign-in
    } catch (error) {
      setErrors({
        submit: 'Falló el inicio de sesión con Google'
      });
    }
  };

  return (
    <div className="login-container">
      {/* Left Panel */}
      <div className="left-panel">
        
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <img src={logo} alt="Logo" className="logo" />
        <div className="login-form">
          <div className="login-card">
            <div className="card-header">
              <h1 className="card-title">Iniciar Sesión</h1>
              <p className="card-subtitle">¡Bienvenido! Ingrese sus datos.</p>
            </div>
            
            <div className="card-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Correo electrónico</label>
                  <input
                    className="form-input"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contraseña">Contraseña</label>
                  <input
                    className="form-input"
                    id="contraseña"
                    type="password"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    required
                  />
                  {errors.contraseña && <span className="error">{errors.contraseña}</span>}
                </div>

                <div className="forgot-password-container">
                  <a href="#" className="link">¿Olvidaste la contraseña?</a>
                </div>

                <button 
                  type="submit" 
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>

                {errors.submit && <div className="error">{errors.submit}</div>}

                <div className="divider">
                  <span className="divider-text">o</span>
                </div>

                <button
                  type="button"
                  className="google-button"
                  onClick={handleGoogleClick}
                >
                  <img 
                    src="/api/placeholder/18/18" 
                    alt="Icono de Google"
                  />
                  Ingresa con Google
                </button>

                <p className="signup-text">
                  ¿No tienes cuenta? {' '}
                  <a href="#" className="link">Regístrate gratis</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
