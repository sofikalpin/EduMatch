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
  { name: 'Linkedin', color: 'hover:text-blue-700' }
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
    <div className="p-6 max-w-4xl mx-auto">
      <HeaderForo logo={logo} />
      <h2 className="text-[#1B1B1B] text-lg font-bold mb-6">Datos personales</h2>

      <div className="flex gap-20">
        {/* Left Column - Photo Section */}
        <div className="w-48">
          <div className="relative mb-4">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No photo</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-blue-600 cursor-pointer text-sm font-medium">
              <Upload size={16} />
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
              className="flex items-center gap-2 text-red-600 text-sm font-medium"
            >
              <Trash2 size={16} />
              <span>ELIMINAR FOTO</span>
            </button>
          </div>
        </div>

        {/* Right Column - Form Fields */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm mb-1">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm mb-1">Contraseña</label>
              <input
                type="password"
                name="contraseña"
                value={formData.contraseña}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Rol</label>
              <input
                type="text"
                name="rol"
                value={formData.rol}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Nivel</label>
              <input
                type="text"
                name="nivel"
                value={formData.nivel}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>

        
          <div className="mt-6 flex justify-end">
  <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors text-center">
    Restablecer Contraseña
  </button>


          </div>
        </div>
      </div>
      <Footer socialIcons={socialIcons} />
    </div>
  );
};

export default PersonalDataForm;
