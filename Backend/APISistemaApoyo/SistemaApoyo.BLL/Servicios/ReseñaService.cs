using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.BLL.Servicios
{
    public class ReseñaService : IReseñaService
    {
        private readonly IGenericRepository<Reseña> _reviewRepository;
        private readonly IGenericRepository<Usuario> _userRepository;

        public ReseñaService(
            IGenericRepository<Reseña> reviewRepository,
            IGenericRepository<Usuario> userRepository)
        {
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
        }

        private async Task<ReseñaRespuestaDTO> MapToDTO(Reseña reseña)
        {
            var user = await _userRepository.Obtener(u => u.Idusuario == reseña.UserId);
            return new ReseñaRespuestaDTO
            {
                Id = reseña.Id,
                UserId = reseña.UserId,
                UserName = user?.NombreUsuario ?? "Usuario Desconocido",
                Rating = reseña.Rating,
                Comment = reseña.Comment,
                Date = reseña.Date
            };
        }

        public async Task<ReseñaRespuestaDTO> CreateReview(ReseñaDTO reviewDTO)
        {
            var user = await _userRepository.Obtener(u => u.Idusuario == reviewDTO.UserId);
            if (user == null)
                throw new Exception("Usuario no encontrado");

            var review = new Reseña
            {
                UserId = reviewDTO.UserId,
                Rating = reviewDTO.Rating,
                Comment = reviewDTO.Comment,
                Date = DateTime.Now
            };

            var createdReview = await _reviewRepository.Crear(review);
            return await MapToDTO(createdReview);
        }

        public async Task<ReseñaRespuestaDTO> GetReview(int id)
        {
            var review = await _reviewRepository.Obtener(r => r.Id == id);
            if (review == null) return null;
            return await MapToDTO(review);
        }

        public async Task<IEnumerable<ReseñaRespuestaDTO>> GetAllReviews()
        {
            var queryable = await _reviewRepository.Consultar();
            var reviews = await queryable.ToListAsync();
            var reviewDTOs = new List<ReseñaRespuestaDTO>();

            foreach (var review in reviews)
            {
                reviewDTOs.Add(await MapToDTO(review));
            }

            return reviewDTOs;
        }

        public async Task<IEnumerable<ReseñaRespuestaDTO>> GetUserReviews(int userId)
        {
            var queryable = await _reviewRepository.Consultar(r => r.UserId == userId);
            var reviews = await queryable.ToListAsync();
            var reviewDTOs = new List<ReseñaRespuestaDTO>();

            foreach (var review in reviews)
            {
                reviewDTOs.Add(await MapToDTO(review));
            }

            return reviewDTOs;
        }

        public async Task<bool> UpdateReview(int id, int userId, ReseñaDTO reseñaDTO)
        {
            var existingReview = await _reviewRepository.Obtener(r => r.Id == id);

            if (existingReview == null || existingReview.UserId != userId)
                return false;

            existingReview.Rating = reseñaDTO.Rating;
            existingReview.Comment = reseñaDTO.Comment;

            return await _reviewRepository.Editar(existingReview);
        }

        public async Task<bool> DeleteReview(int id, int userId)
        {
            var review = await _reviewRepository.Obtener(r => r.Id == id && r.UserId == userId);

            if (review == null)
                return false;

            return await _reviewRepository.Eliminar(review);
        }
    }
}

