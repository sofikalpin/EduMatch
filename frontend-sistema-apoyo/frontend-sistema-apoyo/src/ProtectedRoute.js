import { Navigate } from "react-router-dom";
import { useUser } from "./Context/UserContext";
import { jwtDecode } from "jwt-decode"; // Importa la librería para decodificar el token

const ProtegerRuta = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <p>Cargando...</p>;
    }

    // Verifica si el token es válido
    if (!user || !user.token) {
        return <Navigate to="/iniciarsesion" />;
    }

    try {
        // Decodifica el token para verificar su validez
        const decodedToken = jwtDecode(user.token);
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos

        // Si el token ha expirado, redirige al login
        if (decodedToken.exp < currentTime) {
            return <Navigate to="/iniciarsesion" />;
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return <Navigate to="/iniciarsesion" />;
    }

    // Si el usuario está autenticado y el token es válido, permite el acceso
    return children;
};

export default ProtegerRuta;