import axios from "axios";
const BASE_URL = "http://localhost:5228/API"; // Reemplaza con la URL de tu backend

export const profesor = async (email, passwordHash) => {
  try {
    const response = await axios.post(`${BASE_URL}/Usuario/IniciarSesion`, {
      correo: email,
      contrasenaHash: passwordHash,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error en la autenticación:", error);
    throw error; 
  }
};


export const setProvincia = async (paisId) => {
  const { data } = await axios.post(`${BASE_URL}/enumGeoNames/provincia`, {
    paisId,
  });
  console.log(data);
  return data;
};

export const setLocalidad = async (provinciaId) => {
  const { data } = await axios.post(`${BASE_URL}/enumGeoNames/localidad`, {
    provinciaId,
  });
  console.log(data);
  return data;
};
