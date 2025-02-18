import { useNavigate } from "react-router-dom";
import logo from "../../../logo/LogoInicio.png";
import logoA1 from "../Logos/A1.png";
import logoA2 from "../Logos/A2.png";
import logoB1 from "../Logos/B1.png";
import logoB2 from "../Logos/B2.png";
import logoC1 from "../Logos/C1.png";
import logoC2 from "../Logos/C2.png";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";
import axios from "axios";
import { useEffect, useState } from "react";

const MisCursos = () => {
  const navigate = useNavigate();
  const [cantidadAlumnos, setCantidadAlumnos] = useState(0);
  const [listaGeneral, setListaGeneral] = useState([]);

  // Función para navegar a los detalles del curso seleccionado
  const navegarACurso = (curso) => {
    navigate("/profesor/cursos/detalle", { state: {nivel: curso.id, nombre: curso.nombre}})
  };

// Cargar la lista de usuarios desde la API
 useEffect(() =>  {
    const cargarUsuarios = async () => {
    try {
      const respuesta = await axios.get('http://localhost:5228/API/Usuario/ListaUsuarios');
      if (respuesta.data.status && Array.isArray(respuesta.data.value)) {
        setListaGeneral(respuesta.data.value);
      } else {
        console.error("La API no devolvió la estructura esperada");
        setListaGeneral([]);
      }
    }catch (error) {
      console.error('Error al obtener la cantidad de profesores no autorizados', error);
      setCantidadAlumnos(0);
      setListaGeneral([]);
    }
  }
  cargarUsuarios();
}, []) 

  // Se ejecutará cuando la lista de usuarios cambia
  useEffect(() => {
    if (listaGeneral.length > 0) {
      // Si la lista de usuarios tiene datos
      const calcularAlumnos = () => {
        let nuevaCantidad = {};

        cursos.forEach((curso) => {
          const listaNivel = listaGeneral.filter((usuario) => 
            {       
              return usuario.idnivel == curso.id && usuario.idrol == 2
            }
          );
          nuevaCantidad[curso.id] = listaNivel.length;
        });
        setCantidadAlumnos(nuevaCantidad);
      };
      calcularAlumnos();
    }
  }, [listaGeneral]);

  // Definir los cursos con sus datos
  const cursos = [
    { id:1, nombre: "A1: Curso Principiante", imagen: logoA1 },
    { id:2, nombre: "A2: Curso Básico", imagen: logoA2 },
    { id:3, nombre: "B1: Curso Pre-Intermedio", imagen: logoB1 },
    { id:4, nombre: "B2: Curso Intermedio", imagen: logoB2 },
    { id:5, nombre: "C1: Curso Intermedio-Alto", imagen: logoC1 },
    { id:6, nombre: "C2: Curso Avanzado", imagen: logoC2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      <Header />

      {/* Contenedor principal de cursos */}
      <div className="mis-cursos pt-10 px-6 flex-grow">
        
        {/* Título */}
        <h1 className="text-center text-5xl font-bold text-[#2c7a7b] mb-12">
          Mis Cursos
        </h1>

        {/* Tarjetas por cada cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="curso-card bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl"
            >
              <img
                src={curso.imagen || logo}
                alt={curso.nombre}
                className="w-full h-64 object-cover object-center"
              />

              {/* Contenido de la tarjeta con detalles del curso */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {curso.nombre}
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                  {cantidadAlumnos[curso.id] || 0} Alumnos inscriptos
                </p>

                <button
                  onClick={() => navegarACurso(curso)}
                  className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-sm hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default MisCursos;