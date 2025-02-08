import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

//Crear contexto
const UserContext = createContext();

//Hook para usar el contexto
export const useUser = () => useContext(UserContext);

//Proveedor del contexto 
export const UserProvider = ({ children }) => {

  const [ user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Estado del usuario actualizado: ", user);
  }, [user]);
  
  // Función para iniciar sesión y obtener datos del usuario
  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post("http://localhost:5228/API/Usuario/IniciarSesion", {
        correo: email,
        contrasenaHash: password,
      });
      const token = data.token;

      // Guardar el token en memoria o en HttpOnly Cookie
      sessionStorage.setItem("authToken", token);

      // Llamar al backend para obtener la info del usuario
      await fetchUserData(email, password);
    } catch (error) {
      console.error("Error en login", error.response ? error.response.data : error);
    }
  };

  // Obtener informacion del usuario
  const fetchUserData = async ( email, password ) => {
    try{
      const { data } = await axios.post("http://localhost:5228/API/Usuario/InformacionUsuario",{
        correo: email,
        contrasenaHash: password,
      });
      setUser(data);
    } catch (error) {
      console.error("Error al obtener usuario", error);
    } finally {
      setLoading(false);
    }
  }

  //Cargar usuario desde el token
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};