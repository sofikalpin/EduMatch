using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SistemaApoyo.API.Utilidad;
using SistemaApoyo.BLL.Servicios;
using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("API/[controller]")]
[ApiController]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menuService;
    private readonly ILogger<MenuController> _logger;

    public MenuController(IMenuService menuService, ILogger<MenuController> logger)
    {
        _menuService = menuService;
        _logger = logger;
    }

    [HttpGet]
    [Route("Lista Roles")]

    public async Task<IActionResult> Lista(int idUsuario)
    {
        var rsp = new Response<List<MenuDTO>>();
        try
        {
            var menus = await _menuService.Lista(idUsuario);
            rsp.status = true;
            rsp.msg = "Lista de roles obtenida.";
            rsp.value = menus;
        }
        catch
        {
            rsp.status = false;
            _logger.LogError("Error al obtener la lista de roles.");

        }
        return Ok(rsp);
    }

}