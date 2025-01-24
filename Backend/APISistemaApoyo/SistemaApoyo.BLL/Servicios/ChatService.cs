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
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;

namespace SistemaApoyo.BLL.Servicios
{
    public class ChatService : IChatService
    {
        private readonly IGenericRepository<SistemaApoyo.Model.Models.Chat> _chatRepository;
        private readonly IGenericRepository<Usuario> _usuarioRepository;
        private readonly IMapper _mapper;
        private readonly IHubContext<ChatHub> _chatHubContext; 
        private readonly ILogger _logger;

        public ChatService(IGenericRepository<SistemaApoyo.Model.Models.Chat> chatRepository,
                           IGenericRepository<Usuario> usuarioRepository,
                           IMapper mapper,
                           IHubContext<ChatHub> chatHubContext,
                           ILogger<ChatService> logger) 
        {
            _chatRepository = chatRepository;
            _usuarioRepository = usuarioRepository;
            _mapper = mapper;
            _chatHubContext = chatHubContext; 
            _logger = logger;
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

        public async Task<bool> CrearChat([FromBody] ChatDTO chat) 
        {
            try
            {
                var usuarios = await _usuarioRepository.Consultar(u => u.Idusuario == chat.Idusuario1 || u.Idusuario == chat.Idusuario2);
                if (usuarios.Count() < 2)
                {
                    throw new Exception("Uno o ambos usuarios no existen.");
                }
                var chats = _mapper.Map<SistemaApoyo.Model.Models.Chat>(chat);
                await _chatRepository.Crear(chats);

                // Notificar a los usuarios sobre el nuevo chat
                try
                {
                    await _chatHubContext.Clients.Group(chat.Idusuario1.ToString()).SendAsync("NuevoChat", chats);
                    await _chatHubContext.Clients.Group(chat.Idusuario2.ToString()).SendAsync("NuevoChat", chats);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error al notificar a los usuarios sobre el nuevo chat.");
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear el chat.");
                throw new Exception("Error al crear el chat.", ex);
            }
        }
    }
}
