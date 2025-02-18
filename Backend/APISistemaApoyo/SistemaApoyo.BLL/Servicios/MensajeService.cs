using AutoMapper;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SistemaApoyo.BLL.Hubs;

namespace SistemaApoyo.BLL.Servicios
{

    public class MensajeService : IMensajeService
    {
        private readonly IGenericRepository<Mensaje> _mensajeRepository;
        private readonly IGenericRepository<SistemaApoyo.Model.Chat> _chatRepository;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IMapper _mapper;

        public MensajeService(IGenericRepository<Mensaje> mensajeRepository, IGenericRepository<SistemaApoyo.Model.Chat> chatRepository, IHubContext<ChatHub> hubContext, IMapper mapper)
        {
            _mensajeRepository = mensajeRepository;
            _chatRepository = chatRepository;
            _hubContext = hubContext;
            _mapper = mapper;
        }

        public async Task<MensajeDTO> EnviarMensaje(MensajeDTO mensajeDto)
        {
                try
                {
                    var chat = await _chatRepository.Obtener(c => c.Idchat == mensajeDto.Idchat);
                    if (chat == null)
                    {
                        throw new Exception("El chat no existe.");
                    }
                    if (mensajeDto.Idusuario != chat.Idusuario1 && mensajeDto.Idusuario != chat.Idusuario2)
                    {
                        throw new Exception("El usuario no es parte de este chat.");
                    }

                    var mensaje = _mapper.Map<Mensaje>(mensajeDto);
                    await _mensajeRepository.Crear(mensaje);

                    var mensajeMapped = _mapper.Map<MensajeDTO>(mensaje);

                  
                    await _hubContext.Clients.Group(chat.Idchat.ToString())
                                             .SendAsync("RecibirMensaje", mensajeMapped);

                    return mensajeMapped;
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al enviar el mensaje.", ex);
                }
        }    
        
        //Obtener lista de mensajes segun un chat
        public async Task<IEnumerable<MensajeDTO>> ObtenerMensajesPorChatId(int chatId, int pageNumber, int pageSize)
        {
            try
            {
                var mensajes = await _mensajeRepository.Consultar(m => m.Idchat == chatId);
                if (mensajes == null)
                {
                  throw new InvalidOperationException("Chat no encontrado");
                }

                var mensajesPaginados = mensajes
                    .OrderByDescending(m => m.FechaEnvio)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize);

                return _mapper.Map<IEnumerable<MensajeDTO>>(mensajesPaginados);
            }
            catch (Exception ex)
            {
                    throw new Exception("Error al obtener los mensajes del chat.", ex);
            }
        }    

        //Obtener orden de mesnajes de un chat y de un usuario segun su Fecha de Envio
        public async Task<IEnumerable<MensajeDTO>> ObtenerHistorialChat(int chatId, int usuarioId)
        {
                try
                {
                    var chat = await _chatRepository.Obtener(c => c.Idchat == chatId);
                    if (chat == null || (chat.Idusuario1 != usuarioId && chat.Idusuario2 != usuarioId))
                    {
                        throw new InvalidOperationException("Chat no encontrado o usuario no autorizado");
                    }

                    var mensajes = await _mensajeRepository.Consultar(m => m.Idchat == chatId);
                    return _mapper.Map<IEnumerable<MensajeDTO>>(mensajes.OrderBy(m => m.FechaEnvio));
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al obtener el historial del chat.", ex);
                }
        }        

    }
}
