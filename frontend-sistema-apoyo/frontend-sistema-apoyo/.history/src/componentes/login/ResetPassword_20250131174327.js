import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
  
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
        setMessage('Las contraseñas no coinciden');
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch('/api/Usuario/ReestablecerContrasena', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, nuevaContrasena: password })
        });
        setMessage('Contraseña actualizada exitosamente');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        setMessage('Ocurrió un error al actualizar la contraseña');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Reestablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="Nueva Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border p-2 rounded mb-2"
              />
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border p-2 rounded mb-2"
              />
              {message && <p className="text-sm text-gray-600">{message}</p>}
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                {loading ? 'Procesando...' : 'Actualizar Contraseña'}
              </button>
              <button onClick={() => setIsOpen(false)} className="mt-2 text-red-600">Cerrar</button>
            </form>
          </div>
        </div>
      )
    );
  }
  