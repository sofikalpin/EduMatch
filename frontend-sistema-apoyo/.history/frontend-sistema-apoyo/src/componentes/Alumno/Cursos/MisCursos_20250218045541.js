import { useNavigate } from "react-router-dom";
import logo from "../../../logo/LogoInicio.png";
import logoA1 from "../../../logo/Cursos/A1.png";
import logoA2 from "../../../logo/Cursos/A2.png";
import logoB1 from "../../../logo/Cursos/B1.png";
import logoB2 from "../../../logo/Cursos/B2.png";
import logoC1 from "../../../logo/Cursos/C1.png";
import logoC2 from "../../../logo/Cursos/C2.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import { useUser } from "../../../context/userContext";

const MisCursos = () => {
  const { user } = useUser(); 
  const navigate = useNavigate();

  const navegarACurso = (curso) => {
    navigate("/alumno/cursos", { state: { nivel: curso.nivel, nombre: curso.nombre } });
  };

  const nivelAlumno = user?.nivel || 1;  

  // Lista de cursos 
  const cursos = [
    { nombre: "A1: Curso Principiante", nivel: 1, imagen: logoA1 },
    { nombre: "A2: Curso Básico", nivel: 2, imagen: logoA2 },
    { nombre: "B1: Curso Pre-Intermedio", nivel: 3, imagen: logoB1 },
    { nombre: "B2: Curso Intermedio", nivel: 4, imagen: logoB2 },
    { nombre: "C1: Curso Intermedio-Alto", nivel: 5, imagen: logoC1 },
    { nombre: "C2: Curso Avanzado", nivel: 6, imagen: logoC2 },
  ];

  
  const cursosFiltrados = cursos.filter((curso) => curso.nivel <= nivelAlumno);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      <Header />

      <div className="mis-cursos pt-10 px-6 flex-grow">
        <h1 className="text-center text-5xl font-bold text-[#2c7a7b] mb-12">
          Mis Cursos
        </h1>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cursosFiltrados.map((curso) => (
            <div
              key={curso.nivel}
              className="curso-card bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl"
            >
              <img
                src={curso.imagen || logo}
                alt={curso.nombre}
                className="w-full h-64 object-cover object-center"
              />

              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {curso.nombre}
                </h2>

                <button
                  onClick={() => navegarACurso(curso)}
                  className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-sm hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

   
      <div className="mt-12">
        <Footer/>
      </div>
    </div>
  );
};

export default MisCursos;