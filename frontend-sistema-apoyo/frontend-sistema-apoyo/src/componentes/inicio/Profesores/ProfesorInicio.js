import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, X } from "lucide-react";
import Header from "../Componentes/Header";
import Footer from "../Componentes/Footer";
import logo from "../../../logo/LogoInicio.png";
import axiosInstance from "../../../AxiosConfig/AxiosConfig";

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
      {teacher.levelName && <p className="text-gray-500 text-sm">Nivel: {teacher.levelName}</p>}
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
              {teacher.reviews && teacher.reviews.length > 0 ? (
                teacher.reviews.map((review, index) => (
                  <li key={index} className="border p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-700">"{review.comment}"</p>
                    <p className="text-xs text-gray-500 mt-1">— {review.userName ? review.userName.split(" ")[0] : "Usuario"}</p>
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
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [categories, setCategories] = useState(["Todos"]);

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
    const fetchData = async () => {
      try {
        setLoading(true);

        const reviewsResponse = await axiosInstance.get('Reseña/ListaReseñasAlumno');
        const reviewsData = reviewsResponse.data;
        const reviewsList = Array.isArray(reviewsData) ? reviewsData : [];

        if (!reviewsList.length) {
          setTeachers([]);
          setLoading(false);
          return;
        }

        let usersList = [];
        try {
          const usersResponse = await axiosInstance.get('Usuario/ListaUsuarios');
          usersList = Array.isArray(usersResponse.data) ? usersResponse.data : [];
        } catch (error) {
          console.warn("No se pudieron obtener los usuarios, se usarán valores por defecto:", error);
        }

        let teachersMap = {};
        
        reviewsList.forEach(review => {
          const profesorId = getPropertySafely(review, ['idProfesor', 'profesorId', 'id_profesor']);
          if (!profesorId) return;

          if (!teachersMap[profesorId]) {
            const profesorUser = usersList.find(u => {
              const userId = getPropertySafely(u, ['idusuario', 'id', 'userId']);
              return userId == profesorId;
            });

            teachersMap[profesorId] = {
              id: profesorId,
              name: profesorUser 
                ? getPropertySafely(profesorUser, ['nombreCompleto', 'nombre', 'nombrecompleto', 'username', 'name'], `Profesor ${profesorId}`) 
                : `Profesor ${profesorId}`,
              image: profesorUser ? getPropertySafely(profesorUser, ['fotoRuta', 'foto', 'imagen', 'image']) : null,
              category: getPropertySafely(review, ['categoria', 'category'], ''),
              reviews: [],
              rating: 0,
              totalRating: 0,
              ratingCount: 0
            };
          }

          const alumnoId = getPropertySafely(review, ['idusuario', 'idUsuario', 'userId', 'id_usuario']);
          const alumnoUser = usersList.find(u => {
            const userId = getPropertySafely(u, ['idusuario', 'id', 'userId']);
            return userId == alumnoId;
          });
          
          const userName = alumnoUser 
            ? getPropertySafely(alumnoUser, ['nombreCompleto', 'nombre', 'nombrecompleto', 'username', 'name'], 'Usuario') 
            : 'Usuario';

          const reviewObj = {
            id: getPropertySafely(review, ['idReseña', 'id', 'reseñaId']),
            comment: getPropertySafely(review, ['comentario', 'comment', 'descripcion', 'texto'], ""),
            rating: parseFloat(getPropertySafely(review, ['rating', 'calificacion', 'puntuacion'], 0)),
            userId: alumnoId,
            userName: userName
          };

          teachersMap[profesorId].reviews.push(reviewObj);

          const reviewRating = parseFloat(getPropertySafely(review, ['rating', 'calificacion', 'puntuacion'], 0));
          if (!isNaN(reviewRating)) {
            teachersMap[profesorId].totalRating += reviewRating;
            teachersMap[profesorId].ratingCount += 1;
            teachersMap[profesorId].rating = teachersMap[profesorId].totalRating / teachersMap[profesorId].ratingCount;
          }
        });

        const teachersArray = Object.values(teachersMap);
        setTeachers(teachersArray);
        
        const uniqueCategories = ['Todos', ...new Set(teachersArray.map(t => t.category).filter(Boolean))];
        if (uniqueCategories.length > 1) {
          setCategories(uniqueCategories);
        }

      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(err.message || "Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredTeachers = selectedCategory === "Todos"
    ? teachers
    : teachers.filter((teacher) => teacher.category === selectedCategory);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <Header onNavigate={navigate} logo={logo} />
      
      <div className="flex-grow">
        {categories.length > 1 && (
          <div className="p-4 max-w-7xl mx-auto mb-6 flex justify-end">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-2 text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-6"
              aria-label="Filtrar por categoría"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "Todos" ? "Todas las categorías" : category}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="px-6 py-6">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <p className="text-xl text-gray-600">Cargando profesores...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center p-12">
              <p className="text-xl text-red-500">Error: {error}</p>
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div className="flex justify-center items-center p-12">
              <p className="text-xl text-gray-600">No se encontraron profesores con reseñas.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          )}
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