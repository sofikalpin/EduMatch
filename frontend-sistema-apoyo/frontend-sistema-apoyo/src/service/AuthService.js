import axios from "axios";

const BASE_URL = "http://localhost:5228/API"; 

const AuthService = {
  login: async (email, passwordHash) => {
    try {
      console.log('Datos enviados al servidor:', {
        correo: email,
        contrasenaHash: passwordHash
      });

      const response = await axios.post(`${BASE_URL}/Usuario/IniciarSesion`, {
        correo: email,
        contrasenaHash: passwordHash,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log('Respuesta del servidor:', response.data);
      return response.data; 
    } catch (error) {
      console.error("Error de red completo:", {
        response: error.response,
        data: error.response?.data,
        message: error.message,
        config: error.config
      });
      throw error; 
    }
  }
};

export default AuthService;