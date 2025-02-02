import React, { useState } from 'react';
import './Inicio.css';

const Inicio = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted');
    // Aquí iría la lógica para autenticar al usuario
    onLogin(); // Llamar a la función de login desde el componente padre
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleLoginSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Log In</button>
      </form>
    </div>
  );
};

export default Inicio;
