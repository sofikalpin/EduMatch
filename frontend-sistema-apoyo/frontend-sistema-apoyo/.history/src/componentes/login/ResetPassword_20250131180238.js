const ResetPassword = ({ onClose }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const tokenFromUrl = searchParams.get('token');
      if (!tokenFromUrl) {
        navigate('/login');
        return;
      }
      setToken(tokenFromUrl);
    }, [searchParams, navigate]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
        return;
      }
      setIsLoading(true);
      try {
        await fetch('/api/Usuario/ReestablecerContrasena', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, nuevaContrasena: password })
        });
        setMessage({ type: 'success', text: 'Contraseña actualizada exitosamente' });
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        setMessage({ type: 'error', text: 'Ocurrió un error al actualizar la contraseña' });
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Reestablecer Contraseña</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full p-2.5 border rounded-lg" type="password" placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input className="w-full p-2.5 border rounded-lg" type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            {message.text && (<div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message.text}</div>)}
            <button type="submit" className="w-full p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading}>{isLoading ? 'Procesando...' : 'Actualizar Contraseña'}</button>
          </form>
        </div>
      </div>
    );
  };
  
  export { ForgotPassword, ResetPassword };
  