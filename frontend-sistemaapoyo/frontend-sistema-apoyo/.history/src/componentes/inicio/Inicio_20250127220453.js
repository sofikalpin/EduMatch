export default function Inicio() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
  
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};
      if (!validateEmail(loginForm.email)) newErrors.loginEmail = 'Email inválido';
      if (loginForm.password.length < 6) newErrors.loginPassword = 'La contraseña debe tener al menos 6 caracteres';
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        console.log('Login exitoso', loginForm);
        setShowLoginModal(false);
      }
    };
  
    return (
      <div className="bg-gray-100">
        {/* Login Button at the top */}
        <div className="bg-white py-4 shadow-md">
          <div className="container mx-auto flex justify-end">
            <button onClick={() => setShowLoginModal(true)} className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Iniciar Sesión
            </button>
          </div>
        </div>
  
        {/* Navbar */}
        <header className="flex items-center justify-between p-6 bg-blue-900 text-white">
          <img src={logo} alt="Logo" className="h-12" />
          <nav className="flex gap-6">
            <Link to="#">Profesores</Link>
            <Link to="#">Programa</Link>
            <Link to="#">Herramientas</Link>
          </nav>
        </header>
  
        {/* Hero Section */}
        <section className="bg-cover bg-center p-12 text-center" style={{ backgroundImage: `url(${Imagen1})` }}>
          <h1 className="text-4xl font-bold text-white">Aprende Inglés de Manera Efectiva</h1>
          <p className="text-xl text-white mt-4">Clases personalizadas para todos los niveles con profesores nativos certificados</p>
          <div className="mt-6 flex justify-center gap-4">
            <button onClick={() => setShowRegisterModal(true)} className="px-6 py-3 bg-white text-blue-900 rounded-full">
              Comienza Ahora
            </button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-full">
              Conoce Más
            </button>
          </div>
        </section>
  
        {/* Resto del contenido */}
      </div>
    );
  }
  