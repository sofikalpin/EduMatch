import axios from 'axios';

const API_URL = 'https://tuservidor/api/';

export const iniciarSesion = async (correo, contrasenaHash) => {
  try {
    const response = await axios.post(`${API_URL}IniciarSesion`, {
      Correo: correo,
      ContrasenaHash: contrasenaHash,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data; 
  } catch (error) {
    if (error.response) {
     
      throw new Error(error.response.data.msg || 'Error al iniciar sesión');
    } else {
      
      throw new Error('Error al conectar con el servidor');
    }
  }
};
