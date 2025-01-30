using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.SignalR;
using SistemaApoyo.BLL.Hubs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace WebApiApoyo.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly IHubContext<ChatHub> _chatHubContext;
        private readonly ILogger<ChatController> _logger;

        public ChatController(IChatService chatService, IHubContext<ChatHub> chatHubContext, ILogger<ChatController> logger)
        {
            _chatService = chatService;
            _chatHubContext = chatHubContext;
            _logger = logger;
        }

        [HttpGet]
        [Route("Chat por UsuarioID")]
        public async Task<IActionResult> ObtenerChatsPorUsuarioId(int userId)
        {
            var rsp = new Response<IEnumerable<ChatDTO>>();

            try
            {
                var chats = await _chatService.ObtenerChatsPorUsuarioId(userId);
                rsp.status = true;
                rsp.value = chats;
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = "Ocurrió un error al obtener los chats.";
                _logger.LogError(ex, rsp.msg);
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Chat por ID")]
        public async Task<IActionResult> ObtenerChatPorId(int chatId)
        {
            var rsp = new Response<ChatDTO>();

            try
            {
                var chat = await _chatService.ObtenerChatPorId(chatId);
                rsp.status = true;
                rsp.value = chat;
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = "Ocurrió un error al obtener el chat.";
                _logger.LogError(ex, rsp.msg);
            }
            return Ok(rsp);
        }


        [HttpPost]
        [Route("Crear Chat")]
        public async Task<IActionResult> CrearChat(ChatDTO chatDto)
        {
            var rsp = new Response<bool>();

            try
            {
                var chatCreado = await _chatService.CrearChat(chatDto);
                rsp.status = true;
                rsp.value = chatCreado;
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = "Ocurrió un error al crear el chat.";
                _logger.LogError(ex, rsp.msg);
            }
            return Ok(rsp);
        }
    }
}
