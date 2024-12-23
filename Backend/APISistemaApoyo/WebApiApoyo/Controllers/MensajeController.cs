﻿using Microsoft.AspNetCore.Mvc;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using Microsoft.AspNetCore.SignalR;
using SistemaApoyo.BLL.Hubs;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace WebApiApoyo.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class MensajeController : ControllerBase
    {
        private readonly IMensajeService _mensajeService;
        private readonly IHubContext<ChatHub> _chatHubContext;
        private readonly ILogger<MensajeController> _logger;

        public MensajeController(IMensajeService mensajeService, IHubContext<ChatHub> chatHubContext, ILogger<MensajeController> logger)
        {
            _mensajeService = mensajeService;
            _chatHubContext = chatHubContext;
            _logger = logger;
        }

        [HttpGet]
        [Route("Mensaje por ChatID")]
        public async Task<IActionResult> ObtenerMensajesPorChatId(int chatId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
        {
            var rsp = new Response<IEnumerable<MensajeDTO>>();

            try
            {
                var mensajes = await _mensajeService.ObtenerMensajesPorChatId(chatId, pageNumber, pageSize);
                rsp.status = true;
                rsp.value = mensajes;
                return Ok(rsp);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = "Ocurrió un error al obtener los mensajes.";
                _logger.LogError(ex, rsp.msg);
            }
            return Ok(rsp);
        }

        [HttpPost]
        [Route("Enviar Mensaje")]
        public async Task<IActionResult> EnviarMensaje(MensajeDTO mensajeDto)
        {
            var rsp = new Response<MensajeDTO>();

            try
            {
                var mensajeEnviado = await _mensajeService.EnviarMensaje(mensajeDto);
                rsp.status = true;
                rsp.value = mensajeEnviado;

                
                await _chatHubContext.Clients.Group(mensajeDto.Idchat.ToString()).SendAsync("RecibirMensaje", mensajeEnviado);

                return Ok(rsp);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = "Ocurrió un error al enviar el mensaje.";
                _logger.LogError(ex, rsp.msg);
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("Editar Mensaje")]
        public async Task<IActionResult> EditarMensaje(int id, MensajeDTO mensajeDto)
        {
            var rsp = new Response<MensajeDTO>();

            try
            {
                var mensajeEditado = await _mensajeService.EditarMensaje(id, mensajeDto);
                rsp.status = true;
                rsp.value = mensajeEditado;

              
                await _chatHubContext.Clients.Group(mensajeDto.Idchat.ToString()).SendAsync("MensajeEditado", mensajeEditado);

                return Ok(rsp);
            }
            catch (Exception ex)
            {
                rsp.status = false;
                rsp.msg = "Ocurrió un error al editar el mensaje.";
                _logger.LogError(ex, rsp.msg);
            }
            return Ok(rsp);
        }

        

    }
}
