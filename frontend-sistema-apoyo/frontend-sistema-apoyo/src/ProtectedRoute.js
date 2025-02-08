import { Navigate } from "react-router-dom";
import { useUser } from "./context/userContext";

const ProtegerRuta = ({ children }) => {
    //Ayuda para evitar que usuarios no autenticados accedan a paginas
    const { user, loading } = useUser();

    if (loading) {
        return <p>Cargando...</p>;
    }

    return user ? children : <Navigate to="/iniciarsesion" />; 
};

export default ProtegerRuta;