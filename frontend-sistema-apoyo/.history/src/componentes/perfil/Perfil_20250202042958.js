import React, { useState } from 'react';
import { Trash2, Upload } from 'lucide-react';
import HeaderForo from '../Foro/HeaderForo';
import logo from '../../logo/LogoInicio.png';
import Footer from '../Foro/FooterForo';

const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' },
];

const PersonalDataForm = () => {
  const [photo, setPhoto] = useState(null);
  const [formData] = useState({
    nombre: 'Sofia',
    apellido: 'Kalpin',
    correo: 'sofikalpin@hotmail.com',
    contraseña: '*******',
    rol: 'Profesor',
    nivel: 'B1- Intermedio',
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderForo logo={logo} />

      {/* Contenido principal */}
      <div className="flex-grow p-8 max-w-5xl mx-auto w-full mb-6 mt-6">
        <h2 className="text-[#1B1B1B] text-2xl font-bold mb-12">Datos personales</h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Columna izquierda - Foto */}
          <div className="w-full md:w-64 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">No photo</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-blue-600 cursor-pointer text-lg font-medium">
                <Upload size={20} />
                <span>SUBIR FOTO</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>

              <button
                onClick={handleDeletePhoto}
                className="flex items-center gap-2 text-red-600 text-lg font-medium"
              >
                <Trash2 size={20} />
                <span>ELIMINAR FOTO</span>
              </button>
            </div>
          </div>

          {/* Columna derecha - Campos del formulario */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-lg mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  readOnly
                  className="w-full p-3 border rounded bg-gray-100 focus:outline-none cursor-not-allowed text-lg"
                />
              </div>

              <div>
                <label className="block text-lg mb-2">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  readOnly
                  className="w-full p-3 border rounded bg-gray-100 focus:outline-none cursor-not-allowed text-lg"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-lg mb-2">Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  readOnly
                  className="w-full p-3 border rounded bg-gray-100 focus:outline-none cursor-not-allowed text-lg"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-lg mb-2">Contraseña</label>
                <input
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  readOnly
                  className="w-full p-3 border rounded bg-gray-100 focus:outline-none cursor-not-allowed text-lg"
                />
              </div>

              <div>
                <label className="block text-lg mb-2">Rol</label>
                <input
                  type="text"
                  name="rol"
                  value={formData.rol}
                  readOnly
                  className="w-full p-3 border rounded bg-gray-100 focus:outline-none cursor-not-allowed text-lg"
                />
              </div>

              <div>
                <label className="block text-lg mb-2">Nivel</label>
                <input
                  type="text"
                  name="nivel"
                  value={formData.nivel}
                  readOnly
                  className="w-full p-3 border rounded bg-gray-100 focus:outline-none cursor-not-allowed text-lg"
                />
              </div>
            </div>

            
          </div>
        </div>
        <div className="mt-6 flex justify-end">
        <button className="bg-red-600 text-white px-4 py-1 rounded-full text-sm hover:bg-red-700 transition-colors text-center">
          Cerrar sesión
        </button>
      </div>
      </div>

      {/* Footer */}
      <Footer socialIcons={socialIcons} />
    </div>
  );
};

export default PersonalDataForm;