import React, { useState } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../../logo/LogoInicio.png";

const UserReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setIsSubmitting(true);
      setTimeout(() => {
        setReviews([...reviews, { ...newReview, date: new Date().toLocaleDateString() }]);
        setNewReview({ name: '', rating: 5, comment: '' });
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full bg-white p-4 shadow flex items-center fixed top-0 left-0 right-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <img src={logo} alt="Logo" className="h-8 mx-auto cursor-pointer" onClick={() => navigate(-1)} />
      </header>

      {/* Adjust content spacing for fixed header */}
      <div className="w-full pt-16 flex flex-col items-center">
        {/* Review Form */}
        <div className="w-full max-w-4xl bg-white p-6 mt-10 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-5">¿Qué te pareció EduMatch?</h1>
          <p className='text-gray-600 mb-10'>Contanos tu opinión</p>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
           
            
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })}>
                  <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>

            <textarea placeholder="Comentario" value={newReview.comment} 
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} 
              className="w-full p-3 border rounded-lg focus:ring-indigo-500" rows="3" required />
            
            <button type="submit" className={`w-full py-3 text-white rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar opinión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
