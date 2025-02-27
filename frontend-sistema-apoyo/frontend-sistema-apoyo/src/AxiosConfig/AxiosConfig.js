import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5228/API/", 
  withCredentials: true, // Asegura que las cookies se envíen con cada solicitud
});

// Interceptor para ver las cookies antes de cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Cookies enviadas con la solicitud:", document.cookie);

    const token = Cookies.get("X-Access-Token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para la respuesta
axiosInstance.interceptors.response.use(
  (response) => {

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