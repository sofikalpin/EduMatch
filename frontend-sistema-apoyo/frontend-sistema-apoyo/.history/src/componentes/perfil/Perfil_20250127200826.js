import React, { useState } from 'react';
import { Trash2, Upload } from 'lucide-react';

const Perfil = () => {
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    nombre: 'Juana',
    apellido: 'Perez',
    correo: 'juanaP@gmail.com',
    contraseña: '*************',
    rol: 'Profesor',
    nivel: 'B1- Intermedio'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold text-navy-900 mb-6">Datos personales</h1>
      
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
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
          
          <div className="flex gap-2 mt-2 justify-center">
            <label className="flex items-center gap-2 text-blue-600 cursor-pointer text-sm">
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
              className="flex items-center gap-2 text-red-600 text-sm"
            >
              <Trash2 size={16} />
              <span>ELIMINAR FOTO</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm mb-1">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Rol</label>
          <input
            type="text"
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Profesor"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Nivel</label>
          <input
            type="text"
            name="nivel"
            value={formData.nivel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
          Restablecer Contraseña
        </button>
      </div>
    </div>
  );
};

export default Perfil;