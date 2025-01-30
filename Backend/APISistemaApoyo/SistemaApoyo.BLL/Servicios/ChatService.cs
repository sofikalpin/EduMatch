using Microsoft.AspNetCore.SignalR; // Asegúrate de incluir esta línea
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaApoyo.BLL.Hubs;

namespace SistemaApoyo.BLL.Servicios
{
    public class ChatService : IChatService
    {
        private readonly IGenericRepository<SistemaApoyo.Model.Models.Chat> _chatRepository;
        private readonly IGenericRepository<Usuario> _usuarioRepository;
        private readonly IMapper _mapper;
        private readonly IHubContext<ChatHub> _chatHubContext; 

        public ChatService(IGenericRepository<SistemaApoyo.Model.Models.Chat> chatRepository,
                           IGenericRepository<Usuario> usuarioRepository,
                           IMapper mapper,
                           IHubContext<ChatHub> chatHubContext) 
        {
            _chatRepository = chatRepository;
            _usuarioRepository = usuarioRepository;
            _mapper = mapper;
            _chatHubContext = chatHubContext; 
        }

        public async Task<IEnumerable<ChatDTO>> ObtenerChatsPorUsuarioId(int userId)
        {
            try
            {
                var chats = await _chatRepository.Consultar(c => c.Idusuario1 == userId || c.Idusuario2 == userId);
                if (chats == null)
                {
                    throw new InvalidOperationException("Chat no encontrado");
                }

                return _mapper.Map<IEnumerable<ChatDTO>>(chats);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el chat por id.", ex);
            }
        }
        public async Task<ChatDTO> ObtenerChatPorId(int chatId)
        {
            try
            {
                
                var chat = await _chatRepository.Obtener(c => c.Idchat == chatId);
                if (chat == null)
                {
                    throw new InvalidOperationException("Chat no encontrado");
                }

                
                return _mapper.Map<ChatDTO>(chat);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el chat por id.", ex);
            }
        }

        public async Task<bool> CrearChat(ChatDTO chat)
        {
            try
            {
                if (await _usuarioRepository.Obtener(u => u.Idusuario == chat.Idusuario1) == null ||
                    await _usuarioRepository.Obtener(u => u.Idusuario == chat.Idusuario2) == null)
                {
                    throw new Exception("Uno o ambos usuarios no existen.");
                }
                var chats = _mapper.Map<SistemaApoyo.Model.Models.Chat>(chat);
                await _chatRepository.Crear(chats);

                // Notificar a los usuarios sobre el nuevo chat
                await _chatHubContext.Clients.Group(chat.Idusuario1.ToString()).SendAsync("NuevoChat", chats);
                await _chatHubContext.Clients.Group(chat.Idusuario2.ToString()).SendAsync("NuevoChat", chats);

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear el chat.", ex);
            }
        }
    }
}
