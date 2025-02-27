import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useUser } from "../../../Context/UserContext";
import logo from "../../../logo/LogoInicio.png";
import ProgramDropdown from "./ProgramDropdown";
import { AiOutlineMessage } from "react-icons/ai";

const navigationLinks = {
  alumno: [
    { path: "/alumno", label: "Mis Cursos" },
    { path: "/alumno/profesores", label: "Profesores" },
  ],
  profesor: [
    { path: "/profesor", label: "Inicio" },
    { path: "/profesor/cursos", label: "Cursos" },
    { path: "/profesor/alumnos", label: "Alumnos" },
  ],
  administrador: [
    { path: "/administrador", label: "Inicio" },
    { path: "/administrador/listaProfesores", label: "Profesores" },
    { path: "/administrador/listaAlumnos", label: "Alumnos" },
  ],
};

const Header = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isForumRelatedPage = (pathname) => {
    const forumPaths = [
      "/crear-consulta",
      "/crear-respuesta",
      "/listaForos",
      "/crear-foro",
      "/foro",
      "/consulta",
      "/respuesta",
    ];

    const isExactMatch = forumPaths.some((path) => pathname === path);
    const isCrearConsultaWithId = pathname.includes("/crear-consulta/");
    const containsForumPath =
      pathname.startsWith("/foro/") ||
      pathname.startsWith("/consulta/") ||
      pathname.startsWith("/nuevaConsulta") ||
      pathname.startsWith("/nuevaRespuesta");

    return isExactMatch || containsForumPath || isCrearConsultaWithId;
  };

  const hideForo = isForumRelatedPage(location.pathname);

  const getRoleName = () => {
    if (!user) return null;

    switch (user.idrol) {
      case 1:
        return user.autprof ? "profesor" : "profesor-noAutorizado";
      case 2:
        return "alumno";
      case 3:
        return "administrador";
      default:
        return null;
    }
  };

  const userRole = getRoleName();
  const userName = user?.nombre || "Invitado";
  const userInitial = userName.charAt(0).toUpperCase();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const goToProfile = () => navigate("/perfil");
  const handleLogoutClick = () => setIsLogoutModalOpen(true);
  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };
  
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const goToChat = () => navigate("/chat");
  const goToHome = () => {
    if (!user) return navigate("/");

    switch (user.idrol) {
      case 1:
        navigate(user.autprof ? "/profesor" : "/profesor-noAutorizado");
        break;
      case 2:
        navigate("/alumno");
        break;
      case 3:
        navigate("/administrador");
        break;
      default:
        navigate("/");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col w-full">
        <header className="flex items-center justify-between p-6" style={{ backgroundColor: "#00A89F" }}>
          <nav className="flex items-center gap-6">
            <img
              src={logo || "/placeholder.svg"}
              alt="EDU-MATCH"
              className="h-11 cursor-pointer mr-4"
              onClick={() => navigate("/")}
            />
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate("/inicioprofesor")}
                className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
              >
                Profesores
              </button>
              <div className="relative">
                <button
                  onMouseEnter={() => setIsProgramsOpen(true)}
                  className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-2"
                >
                  Programas
                  <ChevronDown className={`w-5 h-5 transition-transform ${isProgramsOpen ? "rotate-180" : ""}`} />
                </button>
                <ProgramDropdown isOpen={isProgramsOpen} onClose={() => setIsProgramsOpen(false)} />
              </div>
              <button
                onClick={() => navigate("/informacion")}
                className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
              >
                Conocenos
              </button>
            </div>
          </nav>

          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => navigate("/iniciarsesion")}
              className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => navigate("/registrarse")}
              className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
            >
              Registrarse
            </button>
          </nav>

          <button className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="text-white w-6 h-6" />
            ) : (
              <Menu className="text-white w-6 h-6" />
            )}
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-teal-600 p-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  navigate("/inicioprofesor");
                  toggleMobileMenu();
                }}
                className="text-white font-bold hover:text-yellow-400 text-xl"
              >
                Profesores
              </button>
              <button
                onClick={() => {
                  setIsProgramsOpen(!isProgramsOpen);
                }}
                className="text-white font-bold hover:text-yellow-400 text-xl flex items-center justify-between"
              >
                Programas
                <ChevronDown className={`w-5 h-5 transition-transform ${isProgramsOpen ? "rotate-180" : ""}`} />
              </button>
              {isProgramsOpen && <ProgramDropdown isOpen={true} onClose={() => setIsProgramsOpen(false)} />}
              <button
                onClick={() => {
                  navigate("/informacion");
                  toggleMobileMenu();
                }}
                className="text-white font-bold hover:text-yellow-400 text-xl"
              >
                Conocenos
              </button>
              <button
                onClick={() => {
                  navigate("/iniciarsesion");
                  toggleMobileMenu();
                }}
                className="text-white font-bold hover:text-yellow-400 text-xl"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  navigate("/registrarse");
                  toggleMobileMenu();
                }}
                className="text-white font-bold hover:text-yellow-400 text-xl"
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between p-6" style={{ backgroundColor: "#00A89F" }}>
        <div className="w-full">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <img
                src={logo }
                alt="EDU-MATCH"
                className="h-11 cursor-pointer mr-4"
                onClick={goToHome}
              />

              <nav className="hidden md:flex items-center space-x-4">
                {userRole === "profesor-noAutorizado" ? (
                  <Link to="/profesor-noAutorizado" className="text-white font-bold hover:text-yellow-400 text-xl">
                    Inicio
                  </Link>
                ) : (
                  <>
                    {navigationLinks[userRole]?.map((link) => (
                      <Link key={link.path} to={link.path} className="text-white font-bold hover:text-yellow-400 text-xl">
                        {link.label}
                      </Link>
                    ))}

                    {!hideForo && ((userRole && user.idrol !== 1) || (user.idrol === 1 && user.autprof)) && (
                      <Link to="/listaForos" className="text-white font-bold hover:text-yellow-400 text-xl">
                        Foro
                      </Link>
                    )}
                  </>
                )}
              </nav>
            </div>

            <div className="flex items-center space-x-3 relative">
              <button onClick={goToChat} className="text-white text-2xl">
                <AiOutlineMessage />
              </button>
              <span
                className="text-white font-bold text-xl cursor-pointer"
                onClick={toggleMenu}
              >
                {userName}
              </span>
              <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white font-medium text-xl">
                {userInitial}
              </div>

              {isMenuOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 p-4 mt-2">
                  <ul className="space-y-3">
                    <li
                      className="text-gray-800 hover:text-blue-500 cursor-pointer"
                      onClick={goToProfile}
                    >
                      Ver Perfil
                    </li>
                    <li
                      className="text-gray-800 hover:text-blue-500 cursor-pointer"
                      onClick={handleLogoutClick}
                    >
                      Cerrar Sesión
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="text-white w-6 h-6" />
          ) : (
            <Menu className="text-white w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-teal-600 p-4">
          <div className="flex flex-col gap-4">
            {userRole === "profesor-noAutorizado" ? (
              <Link 
                to="/profesor-noAutorizado" 
                className="text-white font-bold hover:text-yellow-400 text-xl"
                onClick={toggleMobileMenu}
              >
                Inicio
              </Link>
            ) : (
              <>
                {navigationLinks[userRole]?.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="text-white font-bold hover:text-yellow-400 text-xl"
                    onClick={toggleMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}

                {!hideForo && ((userRole && user.idrol !== 1) || (user.idrol === 1 && user.autprof)) && (
                  <Link 
                    to="/listaForos" 
                    className="text-white font-bold hover:text-yellow-400 text-xl"
                    onClick={toggleMobileMenu}
                  >
                    Foro
                  </Link>
                )}
              </>
            )}
            <button
              onClick={() => {
                goToChat();
                toggleMobileMenu();
              }}
              className="text-white font-bold hover:text-yellow-400 text-xl text-left"
            >
              Chat
            </button>
          </div>
        </div>
      )}

    {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">¿Está seguro que desea cerrar sesión?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;