using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SistemaApoyo.BLL.Servicios.Contrato;
using SistemaApoyo.DAL.Repositorios.Contrato;
using SistemaApoyo.DTO;
using SistemaApoyo.Model.Models;
using AutoMapper;

namespace SistemaApoyo.BLL.Servicios
{
    public class MenuService : IMenuService
    {
        private readonly IGenericRepository<Usuario> _usuarioReposiorio;
        private readonly IGenericRepository<Menurol> _menuRolReposiorio;
        private readonly IGenericRepository<Menu> _menuReposiorio;
        private readonly IMapper _mapper;

        public MenuService(IGenericRepository<Usuario> usuarioReposiorio,
            IGenericRepository<Menurol> menuRolReposiorio,
            IGenericRepository<Menu> menuReposiorio,
            IMapper mapper)
        {
            _usuarioReposiorio = usuarioReposiorio;
            _menuRolReposiorio = menuRolReposiorio;
            _menuReposiorio = menuReposiorio;
            _mapper = mapper;
        }

        public async Task<List<MenuDTO>> Lista(int idUsuario)
        {
                IQueryable<Usuario> tbusuario = await _usuarioReposiorio.Consultar(u => u.Idusuario == idUsuario);
                IQueryable<Menurol> tbMenuRol = await _menuRolReposiorio.Consultar();
                IQueryable<Menu> tbMenu = await _menuReposiorio.Consultar();
            try
            {
                IQueryable<Menu>tbResultado =( from u in tbusuario
                                               join mr in tbMenuRol on u.Idrol equals mr.Idrol
                                               join m in tbMenu on mr.Idmenu equals m.Idmenu
                                               select m).AsQueryable();
                var listaMenus = tbResultado.ToList();

                return _mapper.Map<List<MenuDTO>>(listaMenus);
            }
            catch 
            {
                throw ;
            }
        }
    }
}
