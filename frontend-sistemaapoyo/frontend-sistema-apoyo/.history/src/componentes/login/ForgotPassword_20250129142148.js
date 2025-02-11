import React from 'react';

const ForgotPassword = () => {
  return (
    <div>
      <h2>Recuperar Contraseña</h2>
      <p>Ingresa tu correo para restablecer la contraseña.</p>
      <input type="email" placeholder="Correo electrónico" />
      <button>Enviar</button>
    </div>
  );
};

export default ForgotPassword;
