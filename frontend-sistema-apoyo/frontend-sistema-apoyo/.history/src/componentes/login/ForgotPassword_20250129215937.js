import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = ({ 
  token, 
  onSuccess = () => {}, 
  apiUrl = 'http://localhost:5228/API/Usuario/RestablecerContrasena' 
}) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [validations, setValidations] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const validatePassword = (password) => {
    setValidations({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValidPassword = Object.values(validations).every(v => v);
    if (!isValidPassword) {
      setMessage({ 
        type: 'error', 
        text: 'La contraseña debe cumplir con todos los requisitos de seguridad.' 
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token, 
          nuevaContrasena: formData.newPassword 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Contraseña restablecida con éxito. Serás redirigido al login...' 
        });
        setTimeout(() => onSuccess(), 3000);
      } else {
        setMessage({ 
          type: 'error', 
          text: data.msg || 'Error al restablecer la contraseña.' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Error en la conexión. Inténtalo de nuevo más tarde.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Restablecer Contraseña
          </h2>
          <p className="text-gray-600 mt-2">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-medium mb-1">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                id="newPassword"
                name="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Requisitos de contraseña */}
          <div className="space-y-2 text-sm">
            <p className={`${validations.hasMinLength ? 'text-green-600' : 'text-gray-600'}`}>
              ✓ Mínimo 8 caracteres
            </p>
            <p className={`${validations.hasUpperCase ? 'text-green-600' : 'text-gray-600'}`}>
              ✓ Al menos una mayúscula
            </p>
            <p className={`${validations.hasLowerCase ? 'text-green-600' : 'text-gray-600'}`}>
              ✓ Al menos una minúscula
            </p>
            <p className={`${validations.hasNumber ? 'text-green-600' : 'text-gray-600'}`}>
              ✓ Al menos un número
            </p>
            <p className={`${validations.hasSpecialChar ? 'text-green-600' : 'text-gray-600'}`}>
              ✓ Al menos un carácter especial
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <div>
            <button 
              type="submit" 
              className="w-full p-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Restableciendo...' : 'Restablecer Contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;