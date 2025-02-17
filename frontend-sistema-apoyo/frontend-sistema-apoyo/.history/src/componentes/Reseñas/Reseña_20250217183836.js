import { useEffect, useState } from "react";
import axios from "axios";
import { Star, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import logo from "../../logo/LogoInicio.png";

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("Debes iniciar sesión para enviar una reseña");
            return;
        }

        if (newReview.comment) {
            setIsSubmitting(true);
            setError("");

            const reviewData = {
                idReseñaP: 0,
                idUsuario: user.idUsuario, 
                nombreUsuario: user.nombreCompleto,
                rating: newReview.rating,
                comentario: newReview.comment,
            };
            

            console.log("Datos enviados:", reviewData);

            try {
                const response = await axios.post(
                    "http://localhost:5228/API/Reseña/CrearReseña",
                    reviewData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Respuesta del servidor:", response.data);

                if (response.data) {
                    setReviews([
                        ...reviews,
                        {
                            ...newReview,
                            nombreUsuario: user.nombre,
                            date: new Date().toLocaleDateString(),
                        },
                    ]);
                    setNewReview({ rating: 5, comment: "" });

                    // Mostrar mensaje de éxito
                    setSuccessMessage(true);
                    setTimeout(() => setSuccessMessage(false), 
                    navigate(-1),
                    10000);
                }
            } catch (err) {
                setError("Error al enviar la reseña. Por favor, intenta de nuevo.");
                console.error("Error al enviar reseña:", err);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <header className="w-full bg-white p-4 shadow flex items-center fixed top-0 left-0 right-0 z-10">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200">
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <img src={logo} alt="Logo" className="h-8 mx-auto cursor-pointer" onClick={() => navigate(-1)} />
            </header>

            <div className="w-full pt-16 flex flex-col items-center">
                <div className="w-full max-w-4xl bg-white p-6 mt-10 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-5">¿Como fue tu experiencia con EduMatch?</h1>
                    <p className="text-gray-600 mb-10">Contanos tu opinión</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Tu opinion nos ayuda a mejorar, gracias por tu colaboración
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                        setNewReview({ ...newReview, rating: star })
                                    }
                                >
                                    <Star
                                        className={`w-6 h-6 ${
                                            star <= newReview.rating
                                                ? "fill-yellow-500 text-yellow-500"
                                                : "text-gray-300"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <textarea
                            placeholder="Comentario"
                            value={newReview.comment}
                            onChange={(e) =>
                                setNewReview({ ...newReview, comment: e.target.value })
                            }
                            className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            rows="3"
                            required
                        />

                        <button
                            type="submit"
                            className={`w-full py-3 text-white rounded-lg ${
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enviando..." : "Enviar opinión"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserReviews;
