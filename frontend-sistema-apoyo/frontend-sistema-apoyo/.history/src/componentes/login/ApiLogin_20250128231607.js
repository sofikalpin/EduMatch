import axios from "axios";

const API_URL = "http://localhost:5228/API/Usuario/IniciarSesion"; // URL del backend

// Obtener la lista de cupones
export const getCupons = async () => {
  try {
    const response = await axios.get(`${API_URL}/cupons`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo cupones:", error);
    return [];
  }
};
