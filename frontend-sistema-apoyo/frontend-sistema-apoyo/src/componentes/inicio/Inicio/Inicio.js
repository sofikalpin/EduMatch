import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import logo from '../../../logo/LogoInicio.png';
import Imagen1 from '../pexels-divinetechygirl-1181534.jpg';
import Imagen2 from '../pexels-katerina-holmes-5905709.jpg';
import Header from '../Componentes/Header';
import Footer from '../Componentes/Footer';
import axiosInstance from "../../../AxiosConfig/AxiosConfig";
import AngryReviews from './AngryReviews.png';

const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const ReviewStars = ({ rating }) => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`} />
    ))}
  </div>
);

const ReviewCard = ({ name, content, rating }) => (
  <div className="p-4 bg-white shadow-md rounded-xl border border-gray-200">
    <ReviewStars rating={rating} />
    <p className="text-gray-700 mt-2">{content}</p>
    <div className="mt-3 text-sm text-gray-500">
      <span>{name}</span>
    </div>
  </div>
);

export default function Inicio() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Obtener las reseñas
        const reviewsResponse = await axiosInstance.get('Reseña/ListaReseñas');
        const reviewsData = reviewsResponse.data;

        // Verificar si las reseñas son un arreglo
        let reviewArray = [];
        if (Array.isArray(reviewsData)) {
          reviewArray = reviewsData;
        } else if (reviewsData && Array.isArray(reviewsData.value)) {
          reviewArray = reviewsData.value;
        } else {
          throw new Error('Se esperaba un arreglo de reseñas, pero se recibió otro formato');
        }

        // Obtener los usuarios (si es necesario)
        const usersResponse = await axiosInstance.get('Usuario/ListaUsuarios');
        const usersData = usersResponse.data;

        // Verificar si los usuarios son un arreglo
        let userArray = [];
        if (Array.isArray(usersData)) {
          userArray = usersData;
        } else if (usersData && Array.isArray(usersData.value)) {
          userArray = usersData.value;
        } else {
          throw new Error('Se esperaba un arreglo de usuarios, pero se recibió otro formato');
        }

        // Crear un mapa de usuarios para buscar nombres
        const userMap = {};
        userArray.forEach(user => {
          userMap[user.idusuario] = user.nombrecompleto;
        });

        // Combinar reseñas con nombres de usuarios
        const combinedReviews = reviewArray.map(review => {
          const userName = userMap[review.idusuaro] || 'Usuario Desconocido';
          return {
            id: review.idReseñaP,
            name: userName,
            content: review.comentario || 'Sin comentario',
            rating: review.rating
          };
        });

        // Ordenar reseñas por rating
        combinedReviews.sort((a, b) => b.rating - a.rating);

        // Calcular el rating promedio
        const totalRating = reviewArray.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = reviewArray.length > 0 ? Math.round(totalRating / reviewArray.length) : 0;

        // Actualizar el estado
        setReviews(combinedReviews);
        setTotalReviews(reviewArray.length);
        setAverageRating(avgRating);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-gray-100">
      <Header 
        onNavigate={navigate}
        logo={logo}
      />

      <section
        className="bg-cover bg-center p-16 text-center min-h-[80vh] relative"
        style={{ backgroundImage: `url(${Imagen2})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 mt-20">
          <h1 className="text-4xl font-bold text-white">Aprende Inglés de Manera Efectiva</h1>
          <p className="text-xl text-white mt-4">Clases personalizadas para todos los niveles con profesores nativos certificados</p>
        </div>
        <div className="relative z-10 mt-6 flex justify-center gap-4 flex-col sm:flex-row">
          <button 
            onClick={() => navigate('/registrarse')} 
            className="px-6 py-3 bg-white text-blue-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            Comienza Ahora
          </button>
          <button 
            onClick={() => navigate('/informacion')} 
            className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-colors"
          >
            Conoce Más
          </button>
        </div>
      </section>

      {/* Sección de reseñas */}
      <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-blue-900 mb-6">Conoce la opinión de nuestros estudiantes sobre EduMatch en:</h1>
          <div className="flex justify-center mt-2">
            <img src={AngryReviews} alt="AngryReviews Logo" className="w-48 h-auto" />
          </div>
        </div>
        <div className="flex justify-center items-center mb-8 mt-10">
          <span className="text-lg text-gray-700 mr-4">
            {averageRating === 5 ? 'Excelente' : 
             averageRating === 4 ? 'Muy bueno' : 
             averageRating === 3 ? 'Bueno' : 
             averageRating === 2 ? 'Regular' : 
             averageRating === 1 ? 'Malo' : 'Sin calificaciones'}
          </span>
          <ReviewStars rating={averageRating} />
        </div>

        <p className="text-sm text-gray-500 mb-12 text-center">
          En base a {totalReviews} {totalReviews === 1 ? 'opinión' : 'opiniones'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-500">Cargando opiniones...</p>
          ) : error ? (
            <p className="text-red-500">Error al cargar las opiniones: {error}</p>
          ) : reviews.length > 0 ? (
            reviews.slice(0, visibleReviews).map((review) => (
              <div className="mb-6" key={review.id}>
                <ReviewCard {...review} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay opiniones disponibles en este momento.</p>
          )}
        </div>
        {!loading && !error && reviews.length > visibleReviews && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setVisibleReviews(reviews.length)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Ver más
            </button>
          </div>
        )}
      </section>

      <Footer 
        socialIcons={socialIcons}
        onNavigation={navigate}
      />
    </div>
  );
}