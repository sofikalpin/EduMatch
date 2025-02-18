import React, { useState } from 'react';
import { Trash2, Upload } from 'lucide-react';

const PersonalDataForm = () => {
  const [photo, setPhoto] = useState(null);
  const formData = {
    nombre: 'Sofia',
    apellido: 'Kalpin',
    correo: 'sofikalpin@hotmail.com',
    contraseña: '*******',
    rol: 'Profesor',
    nivel: 'B1- Intermedio',
  };

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

  const handlePasswordReset = () => {
    alert('Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico.');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-emerald-500 text-white p-4 mb-8 shadow">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <a href="#" className="font-bold">PROFESORES</a>
            <a href="#" className="text-yellow-300 font-bold">PROGRAMAS</a>
            <a href="#" className="font-bold">HERRAMIENTAS</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="font-bold">ACCEDE</a>
            <a href="#" className="bg-pink-500 px-4 py-1 rounded-full font-bold hover:bg-pink-600 transition">
              REGÍSTRATE
            </a>
          </div>
        </nav>
      </header>

      <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
        <h2 className="text-[#1B1B1B] text-lg font-bold mb-6">Datos personales</h2>

        <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3 flex flex-col items-center justify-center">
  <div className="relative mb-4">
    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg flex items-center justify-center">
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

  <div className="flex flex-col gap-2 items-center justify-center">
    <label
      htmlFor="upload-photo"
      className="flex items-center gap-2 text-blue-600 cursor-pointer text-sm font-medium"
    >
      <Upload size={16} />
      <span>SUBIR FOTO</span>
      <input
        id="upload-photo"
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


          <div className="flex-1">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm mb-1">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm mb-1">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="correo" className="block text-sm mb-1">Correo electrónico</label>
                <input
                  id="correo"
                  type="email"
                  name="correo"
                  value={formData.correo}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="contraseña" className="block text-sm mb-1">Contraseña</label>
                <input
                  id="contraseña"
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="rol" className="block text-sm mb-1">Rol</label>
                <input
                  id="rol"
                  type="text"
                  name="rol"
                  value={formData.rol}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="nivel" className="block text-sm mb-1">Nivel</label>
                <input
                  id="nivel"
                  type="text"
                  name="nivel"
                  value={formData.nivel}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handlePasswordReset}
                className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors text-center"
              >
                Restablecer Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataForm;
