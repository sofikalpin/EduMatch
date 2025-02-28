import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5228/api/Acceso/Acceso", // Base URL de tu API
  withCredentials: true, // Asegura que las cookies se envíen con cada solicitud
});


// Agregar un interceptor para ver las cookies antes de cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    // Verifica si las cookies están presentes
    console.log("Cookies enviadas con la solicitud:", document.cookie);
    
    // Obtén el token de las cookies
    const token = Cookies.get("X-Access-Token"); // Si usas cookies para almacenar el token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Agregar un interceptor para la respuesta
axiosInstance.interceptors.response.use(
  (response) => {
    // Verifica la respuesta
    console.log("Respuesta de la API:", response);
    return response;
  },
  (error) => {
    console.log("Error en la respuesta:", error.response);
    if (error.response) {
        console.log("Detalles del error:", error.response.data);
      }
    return Promise.reject(error);
    
  }
);

export default axiosInstance;
