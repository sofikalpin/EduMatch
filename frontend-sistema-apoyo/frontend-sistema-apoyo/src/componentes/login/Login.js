import React, { useState, useEffect } from "react";
import logo from "../../logo/LogoInicio.png";
import Foto from './Mujer con Computadora.jpg';
import { useUser } from "../../Context/UserContext";
import { useNavigate, Link } from 'react-router-dom';
import ForgotPassword from './ForgotPassword'; 
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

// Almacenar referencia al interceptor para poder eliminarlo después
let requestInterceptorId = null;

// Configurar el interceptor de axios para incluir el token en las solicitudes
const setupAuthInterceptor = (token) => {
  // Si ya existe un interceptor, eliminarlo primero
  if (requestInterceptorId !== null) {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
  }
  
  // Crear nuevo interceptor y guardar su ID
  requestInterceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return requestInterceptorId;
};

// Función para cerrar sesión (debe exportarse)
export const logout = (navigateFunction, setUserFunction) => {
  console.log("Ejecutando logout completo");
  
  // 1. Eliminar todos los tokens de almacenamiento
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  
  // 2. Limpiar todos los datos de sesión
  sessionStorage.removeItem("userData");
  sessionStorage.removeItem("authToken");
  
  // 3. Eliminar todas las cookies relacionadas con autenticación
  Cookies.remove('token');
  
  // 4. Eliminar todo el localStorage relacionado con la aplicación (puedes ajustar esto si hay datos que quieras conservar)
  // Opción más segura - borrar solo items específicos de la aplicación
  const appKeys = ['user', 'userInfo', 'userData', 'auth', 'session']; // Añade todas las keys que puedas usar
  appKeys.forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
  
  // 5. Purgar cualquier estado en el contexto de React
  if (setUserFunction) {
    setUserFunction(null);
  }
  
  // 6. Eliminar interceptor de Axios y resetear axios
  if (requestInterceptorId !== null) {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
    requestInterceptorId = null;
  }
  
  // 7. Configurar axios para que no tenga token por defecto
  delete axiosInstance.defaults.headers.common['Authorization'];
  
  // 8. Forzar una recarga completa de la aplicación para limpiar todo el estado en memoria
  // Esta es la acción más drástica - usa con precaución
  if (navigateFunction) {
    // Redirecciona primero a una ruta específica
    navigateFunction("/iniciarsesion");
    // Opcional: forzar recarga de página después de navegar
    // setTimeout(() => window.location.reload(), 100);
  }
};

const handleLogin = async (email, password) => {
  try {
    // Solicitud directa de autenticación sin el token de admin
    const response = await axiosInstance.post('Usuario/IniciarSesion', {
      correo: email,
      contrasenaHash: password
    });

    if (!response.data.token) {
      throw new Error("No se recibió token de autenticación");
    }
    
    return response.data.token;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

const saveUserSession = (token, rememberMe) => {
  // Limpiar completamente cualquier sesión anterior primero
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  
  // Guardar el nuevo token en el almacenamiento seleccionado
  if (rememberMe) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
  
  // Configurar axios para usar este token en futuras solicitudes
  setupAuthInterceptor(token);
};

const Login = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [manualLogin, setManualLogin] = useState(false);

  // Método para cerrar sesión desde este componente
  const handleLogout = () => {
    logout(navigate, setUser);
  };

  // Ejecutar logout al montar el componente para asegurar siempre un estado limpio
  useEffect(() => {
    console.log("Login component mounted - cleaning any existing session");
    logout(null, setUser); // No navegamos aquí para evitar loop infinito
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Solo permitir autologin si se hace un login manual
  useEffect(() => {
    if (!manualLogin) {
      return; // No hacer nada si no ha habido login manual
    }
    
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Verificar si el token no ha expirado
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Token válido, configurar usuario y redirigir
          setupAuthInterceptor(token);
          const userData = {
            email: decodedToken.email,
            idrol: parseInt(decodedToken.role),
            token: token,
            nombre:  decodedToken.unique_name || '',
            nivel : decodedToken.Idnivel,
            autprof : decodedToken.Autprof,
            idusuario: parseInt(decodedToken.idusuario, 10) // Convierte a entero base 10
          };
          setUser(userData);
          setIsLoggingIn(true);
        } else {
          // Token expirado
          console.log("Token expirado, cerrando sesión");
          handleLogout();
        }
      } catch (error) {
        console.error("Error al decodificar token guardado:", error);
        // Limpiar token inválido
        handleLogout();
      }
    }
  }, [manualLogin, setUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
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
      // Iniciar sesión directamente con el usuario real
      const userToken = await handleLogin(
        formData.email,
        formData.password
      );

      console.log('Login exitoso, token recibido');

      // Guardar el token del usuario
      saveUserSession(userToken, formData.rememberMe);

      // Decodificar el token para obtener los datos del usuario
      const decodedToken = jwtDecode(userToken);
      
      console.log('dato decodetoken:', decodedToken)
      // Extraer el rol del token decodificado
      const idrol = parseInt(decodedToken.role);
      console.log('ID Rol obtenido:', idrol);
      
      // Crear un objeto con los datos del usuario
      const userData = {
        email: decodedToken.email,
        idrol: idrol,
        token: userToken,
        nombre: decodedToken.unique_name|| '',
        nivel : decodedToken.Idnivel,
        autprof : decodedToken.Autprof,
        idusuario: parseInt(decodedToken.idusuario, 10) // Convierte a entero base 10


      };

      console.log('datos del usuario::',userData);

      // Actualizar el contexto del usuario
      setUser(userData);
      
      // Indicar que se hizo login manual
      setManualLogin(true);
      
      // Activar el estado de redirección
      setIsLoggingIn(true);

    } catch (error) {
      console.error('Error en submit:', error);
      setErrors({
        submit: 'Error al iniciar sesión. Por favor verifica tus credenciales.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirigir al usuario según su rol
  useEffect(() => {
    if (isLoggingIn && user?.idrol) {
      console.log("Redirigiendo según el rol:", user.idrol);
      switch (user.idrol) {
        case 1:
          navigate("/profesor");
          break;
        case 2:
          navigate("/alumno");
          break;
        case 3:
          navigate("/administrador");
          break;
        default:
          navigate("/iniciarsesion");
      }
      setIsLoggingIn(false);
    }
  }, [user, isLoggingIn, navigate]);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gray-100">
        <img src={Foto} alt="Imagen" className="w-full h-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="mx-auto mb-6 cursor-pointer" 
            style={{ width: '380px' }} 
            onClick={handleLogoClick}
          />

          <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-gray-900">Iniciar Sesión</h1>
              <p className="text-gray-600">¡Bienvenido! Ingrese sus datos.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-left">
                  Correo electrónico
                </label>
                <input
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div>
                <label htmlFor="contraseña" className="block text-gray-700 text-left">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="contraseña"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Recordarme</span>
                </label>
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)} 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ¿Olvidaste la contraseña?
                </button>
              </div>

              <button 
                type="submit" 
                className={`w-full p-3 mt-4 text-white font-semibold rounded-lg ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>

              {errors.submit && (
                <div className="text-red-500 text-sm mt-2">{errors.submit}</div>
              )}

              <p className="mt-4 text-sm text-gray-600">
                ¿No tienes cuenta? {' '}
                <Link to="/registrarse" className="text-blue-600 hover:text-blue-800">
                  Regístrate gratis
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;