import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5228/API/", // Base URL de tu API
  withCredentials: true, // Asegura que las cookies se envíen con cada solicitud
});

// Agregar un interceptor para ver las cookies antes de cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    // Verifica si las cookies están presentes
    console.log("Cookies enviadas con la solicitud:", document.cookie);
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
    return Promise.reject(error);
  }
);

export default axiosInstance;
