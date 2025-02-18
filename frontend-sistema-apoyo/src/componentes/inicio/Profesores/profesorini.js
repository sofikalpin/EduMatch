import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, X } from "lucide-react";
import TopBar from "../Componentes/TopBar";
import Header from "../Componentes/Header";
import Footer from "../Componentes/Footer";
import logo from "../../../logo/LogoInicio.png";

// Footer data
const footerSections = {
  section1: {
    title: "Información",
    links: ["Sobre Nosotros", "Términos y Condiciones", "Política de Privacidad", "Contacto"],
  },
  section2: {
    title: "Programas",
    links: ["Nivel Inicial", "Nivel Medio", "Nivel Superior"],
  },
};

const socialIcons = [
  { name: "Facebook", color: "hover:text-blue-500" },
  { name: "Instagram", color: "hover:text-pink-500" },
  { name: "Twitter", color: "hover:text-blue-400" },
  { name: "Youtube", color: "hover:text-red-500" },
  { name: "Linkedin", color: "hover:text-blue-700" },
];

const TeacherCard = ({ teacher }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-gray-200">
        <img src={teacher.image || placeholderImage} alt={teacher.name} className="w-full h-full object-cover" />
      </div>
      <h4 className="font-semibold text-lg mt-4">{teacher.name}</h4>
      <p className="text-gray-500 text-sm">Nivel: {teacher.levelName}</p>
      <p className="text-yellow-500 text-sm">
        {teacher.rating ? `${teacher.rating.toFixed(1)} estrellas` : "Sin calificación"}
      </p>

      <button
        className="mt-4 text-blue-500 hover:text-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        Mira las opiniones
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Opiniones de {teacher.name}</h3>
            <ul className="space-y-3">
              {teacher.reviews.length > 0 ? (
                teacher.reviews.map((review, index) => (
                  <li key={index} className="border p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-700">"{review.comment}"</p>
                    <p className="text-xs text-gray-500 mt-1">— {review.userName.split(" ")[0]}</p>

                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No hay opiniones aún.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default function InicioProfesor() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("Todos");
  const [teachers, setTeachers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPropertySafely = (obj, properties, defaultValue = "") => {
    if (!obj) return defaultValue;

    for (const prop of properties) {
      if (obj[prop] !== undefined && obj[prop] !== null) {
        return obj[prop];
      }
    }

    return defaultValue;
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        
        // Fetch reviews and users data
        const reviewsResponse = await fetch('http://localhost:5228/API/Reseña/ListaReseñasAlumno');
        if (!reviewsResponse.ok) throw new Error('Error al obtener las reseñas');
        const reviewsData = await reviewsResponse.json();

        const usersResponse = await fetch('http://localhost:5228/API/Usuario/ListaUsuarios');
        if (!usersResponse.ok) throw new Error('Error al obtener los usuarios');
        const usersRawData = await usersResponse.json();

        const reviewsList = Array.isArray(reviewsData) ? reviewsData : (reviewsData.value && Array.isArray(reviewsData.value)) ? reviewsData.value : null;
        const usersData = Array.isArray(usersRawData) ? usersRawData : (usersRawData.value && Array.isArray(usersRawData.value)) ? usersRawData.value : null;

        if (!reviewsList || !usersData) throw new Error('Datos no válidos para reseñas o usuarios');

        let teachersMap = {};
        
        reviewsList.forEach((review) => {
          const profesorId = getPropertySafely(review, ['idProfesor', 'profesorId', 'id_profesor']);
          if (!profesorId) return;

          if (!teachersMap[profesorId]) {
            const profesorUser = usersData.find(u => getPropertySafely(u, ['idusuario', 'id', 'userId']) == profesorId);
            if (!profesorUser) return;

            teachersMap[profesorId] = {
              id: profesorId,
              name: getPropertySafely(profesorUser, ['nombreCompleto', 'nombre', 'nombrecompleto', 'username', 'name'], "Profesor"),
              image: getPropertySafely(profesorUser, ['fotoRuta', 'foto', 'imagen', 'image']),
              levelId: getPropertySafely(profesorUser, ['idnivel', 'nivelId', 'id_nivel']),
              status: "Activo",
              reviews: [],
              rating: 0,
              totalRating: 0,
              ratingCount: 0
            };
          }

          const alumnoId = getPropertySafely(review, ['idusuario', 'idUsuario', 'userId', 'id_usuario']);
          const alumnoUser = usersData.find(u => getPropertySafely(u, ['idusuario', 'id', 'userId']) == alumnoId);
          const userName = alumnoUser ? getPropertySafely(alumnoUser, ['nombreCompleto', 'nombre', 'nombrecompleto', 'username', 'name'], 'Usuario desconocido') : 'Usuario desconocido';

          teachersMap[profesorId].reviews.push({
            id: getPropertySafely(review, ['idReseña', 'id', 'reseñaId']),
            comment: getPropertySafely(review, ['comentario', 'comment', 'descripcion', 'texto'], ""),
            rating: parseFloat(getPropertySafely(review, ['rating', 'calificacion', 'puntuacion'], 0)),
            userId: alumnoId,
            userName: userName
          });

          const reviewRating = parseFloat(getPropertySafely(review, ['rating', 'calificacion', 'puntuacion'], 0));
          teachersMap[profesorId].totalRating += reviewRating;
          teachersMap[profesorId].ratingCount += 1;
          teachersMap[profesorId].rating = teachersMap[profesorId].totalRating / teachersMap[profesorId].ratingCount;
        });

        let teachersArray = [];
        const uniqueLevels = new Set();
        for (const teacherId in teachersMap) {
          const teacher = teachersMap[teacherId];

          if (teacher.levelId) {
            try {
              const levelResponse = await fetch(`http://localhost:5228/API/Nivel/Nivel ID?id=${teacher.levelId}`);
              if (levelResponse.ok) {
                const levelData = await levelResponse.json();
                console.log("Level data:", levelData);
                
                if (levelData.value && typeof levelData.value === 'object') {
                  teacher.levelName = levelData.value.descripcion || 
                                    levelData.value.descripción ||
                                    levelData.value.description ||
                                    "Nivel no especificado";
                } else {
                  teacher.levelName = levelData.descripcion ||
                                    levelData.descripción ||
                                    levelData.description ||
                                    "Nivel no especificado";
                }
          
                if (teacher.levelName !== "Nivel no especificado") {
                  uniqueLevels.add(teacher.levelName);
                }
                
                console.log("Processed level name:", teacher.levelName);
              } else {
                console.error(`Error en la respuesta del nivel: ${levelResponse.status}`);
                teacher.levelName = "Nivel no especificado";
              }
            } catch (levelError) {
              console.error("Error al obtener el nivel:", levelError);
              teacher.levelName = "Nivel no especificado";
            }
          } else {
            teacher.levelName = "Nivel no especificado";
          }

          teachersArray.push(teacher);
        }

        setTeachers([...teachersArray]);
        setLevels([...uniqueLevels].sort());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const filteredTeachers = selectedLevel === "Todos"
    ? teachers
    : teachers.filter((teacher) => teacher.levelName === selectedLevel);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <TopBar onLogin={() => navigate('/iniciarsesion')} onRegister={() => navigate('/registrarse')} />
      <Header onNavigate={navigate} logo={logo} />
      
      <div className="flex-grow">
        <div className="p-4 max-w-7xl mx-auto mb-6 flex justify-end">
          <select
            value={selectedLevel}
            onChange={handleLevelChange}
            className="px-3 py-2 text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6"
            aria-label="Filtrar por nivel"
          >
            <option value="Todos">Todos los niveles</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            {filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>

      <Footer 
        sections={footerSections} 
        socialIcons={socialIcons}
        onNavigation={navigate}
      />
    </div>
  );
}