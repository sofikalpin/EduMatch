import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, X } from 'lucide-react';
import logo from '../../../logo/LogoInicio.png';
import Imagen1 from '../pexels-divinetechygirl-1181534.jpg';
import Imagen2 from '../pexels-katerina-holmes-5905709.jpg';
import TopBar from '../Componentes/TopBar';
import Header from '../Componentes/Header';
import Footer from '../Componentes/Footer';
import AngryReviews from './AngryReviews.png';

const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];


const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-20">
    <div className="bg-white p-8 rounded-xl w-96">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button onClick={onClose}>
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

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


const ProgramDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const levels = [
    { name: 'Nivel Básico', route: './NivelInicial', description: 'Para principiantes (A1-A2)' },
    { name: 'Nivel Intermedio', route: './NivelIntermedio', description: 'Mejora tu fluidez (B1-B2)' },
    { name: 'Nivel Avanzado', route: './NivelAvanzado', description: 'Perfecciona tu inglés (C1-C2)' },
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl py-2 z-50"
      onMouseLeave={onClose}
    >
      {levels.map((level, index) => (
        <button
          key={index}
          onClick={() => navigate(level.route)}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors group"
        >
          <div className="text-gray-900 font-medium group-hover:text-blue-600">
            {level.name}
          </div>
          <div className="text-sm text-gray-500 group-hover:text-blue-500">
            {level.description}
          </div>
        </button>
      ))}
    </div>
  );
};

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
       
        const reviewsResponse = await fetch('http://localhost:5228/API/Reseña/ListaReseñas');
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();
        
        
        let reviewArray = [];
        if (Array.isArray(reviewsData)) {
          reviewArray = reviewsData;
        } else if (reviewsData && Array.isArray(reviewsData.value)) {
          reviewArray = reviewsData.value;
        } else {
          throw new Error('Se esperaba un arreglo de reseñas, pero se recibió otro formato');
        }
        
      
        const usersResponse = await fetch('http://localhost:5228/API/Usuario/ListaUsuarios');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await usersResponse.json();
        console.log('usersData:', usersData); 

       
        let userArray = [];
        if (Array.isArray(usersData)) {
          userArray = usersData;
        } else if (usersData && Array.isArray(usersData.value)) {
          userArray = usersData.value;
        } else {
          throw new Error('Se esperaba un arreglo de usuarios, pero se recibió otro formato');
        }
      
        const userMap = {};
        userArray.forEach(user => {
          userMap[user.idusuario] = user.nombrecompleto;
        });
          
        const combinedReviews = reviewArray.map(review => {
          const userName = userMap[review.idusuaro] || 'Usuario Desconocido';
          return {
            id: review.idReseñaP,
            name: userName,
            content: review.comentario || 'Sin comentario',
            rating: review.rating
          };
        });
        
        combinedReviews.sort((a, b) => b.rating - a.rating);
        
        const totalRating = reviewArray.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = reviewArray.length > 0 ? Math.round(totalRating / reviewArray.length) : 0;
        
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
    
      <TopBar 
        onLogin={() => navigate('/iniciarsesion')} 
        onRegister={() => navigate('/registrarse')} 
      />
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

      
      <section className="p-12 bg-gray-50">
        <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">
          Tres pilares de aprendizaje que garantizan tu fluidez
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1 space-y-8">
            {['Clases Grabadas', 'Clases Personalizadas', 'Clases con Profesores Nativos'].map((title, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <button onClick={() => navigate('/registrarse')} className="w-full text-left">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:justify-end lg:w-1/3">
            <img
              src={Imagen1}
              alt="Image"
              className="w-80 h-80 object-cover rounded-full shadow-md mx-auto"
            />
          </div>
        </div>
      </section>

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
        { !loading && !error && reviews.length > visibleReviews && (
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