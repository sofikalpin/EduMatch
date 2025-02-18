using SistemaApoyo.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SistemaApoyo.BLL.Servicios.Contrato
{
    public interface IChatService
    {
        Task<bool> CrearChat(ChatDTO chat);
        Task<List<UsuarioDTO>> ListaContactos();
        Task<ChatDTO> ObtenerChatPorId(int chatId);
        Task<IEnumerable<ChatDTO>> ObtenerChatsPorUsuarioId(int userId);
    }
}