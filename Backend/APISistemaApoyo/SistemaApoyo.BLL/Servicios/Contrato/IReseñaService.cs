using SistemaApoyo.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IReseñaService
    {
        Task<ReseñaRespuestaDTO> CreateReview(ReseñaDTO reviewDTO);
        Task<ReseñaRespuestaDTO> GetReview(int id);
        Task<IEnumerable<ReseñaRespuestaDTO>> GetAllReviews();
        Task<IEnumerable<ReseñaRespuestaDTO>> GetUserReviews(int userId);
        Task<bool> UpdateReview(int id, int userId, ReseñaDTO reviewDTO);
        Task<bool> DeleteReview(int id, int userId);
    }
}
