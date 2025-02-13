import React, { useEffect, useState } from "react";
import logo from "../../../../logo/LogoInicio.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const niveles = {
  A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6,
};

export const EditarProfesor = ({ onUpdate }) => {
  const location = useLocation();
  const idusuario = location.state?.idusuario;
  
  const [profesor, setProfesor] = useState([]);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nivel, setNivel] = useState("");
  const [mensajeActualizado, setMensajeActualizado] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarProfesor = async () => {
      if (!idusuario) return;
      try {
        const response = await axios.get(
          `http://localhost:5228/API/AdministradorProfesor/ProfesorID?id=${idusuario}`
        );
        
        if (!response.data || !response.data.value) throw new Error("No se encontraron datos del profesor.");
        const profesorData = response.data.value;

        const [nombre, ...apellidoPartes] = profesorData.nombrecompleto.split(" ");
        setNombre(nombre || "");
        setApellido(apellidoPartes.join(" "));
        setEmail(profesorData.correo || "");
        setNivel(Object.keys(niveles).find(key => niveles[key] === profesorData.idnivel) || "");
        setProfesor(profesorData);
      } catch (error) {
        // Verificar si el error es de Axios y mostrar el mensaje correcto
        if (error.response) {
            alert(`Error ${error.response.status}: ${error.response.data.message || "No se pudieron cargar los datos del profesor."}`);
        } else {
            alert(error.message);
        }
    }finally{
        setLoading(false);
    }
  };
    cargarProfesor();
  }, [idusuario]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !email || !nivel) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    try {
      const nivelId = niveles[nivel];
      const datosActualizados = {
        idusuario: parseInt(idusuario, 10),
        nombrecompleto: `${nombre.trim()} ${apellido.trim()}`,
        contraseñaHash: profesor.contraseñaHash,
        fecharegistro: profesor.fecharegistro,
        correo: email.trim(),
        idnivel: nivelId,
        idrol: 1,
        tokenRecuperacion: profesor.tokenRecuperacion,
        tokenExpiracion: profesor.tokenExpiracion,
        cvRuta: profesor.cvRuta,
        fotoRuta: profesor.fotoRuta,
      };
      const response = await axios.put(
        `http://localhost:5228/API/AdministradorProfesor/EditarporID?id=${idusuario}`,
        datosActualizados
      );
      if (response.data.status) {
        setMensajeActualizado("Profesor actualizado con éxito.");
        setTimeout(() => setMensajeActualizado(""), 2000);
        if (typeof onUpdate === "function") onUpdate();
      } else {
        alert("No se pudo actualizar el profesor.");
      }
    } catch (error) {
      console.error("Error al actualizar el profesor:", error);
    }
  };

  const handleCancelar = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-[#00A89F] p-8 text-center relative flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-40 h-auto object-contain mb-4" />
          <h3 className="text-3xl font-bold text-white tracking-wide">Editar Profesor</h3>
        </div>
        {mensajeActualizado && (
          <div className="bg-[#00A89F] text-white text-center p-4 animate-pulse">
            {mensajeActualizado}
          </div>
        )}

        { loading ? (
          <p>Cargando datos...</p>
        ) : (
        <form onSubmit={handleActualizar} className="p-10 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A89F] transition-all duration-300"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
              <input value={apellido} onChange={(e) => setApellido(e.target.value)} type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A89F] transition-all duration-300"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A89F] transition-all duration-300"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Profesor</label>
            <select value={nivel} onChange={(e) => setNivel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A89F] transition-all duration-300">
              <option value="" disabled>Seleccione un nivel</option>
              {Object.keys(niveles).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4 pt-4">
            <button type="submit" className="w-full py-3 bg-[#00A89F] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-[1.01] shadow-md hover:shadow-lg">
              Actualizar Profesor
            </button>
            <button type="button" onClick={handleCancelar} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-[1.01] shadow-md hover:shadow-lg">
              Cancelar
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default EditarProfesor;
