import React from "react";
import Header from "./HeaderNoAutoProfesor"; // Importa el Header
import Footer from "./FooterProfesor"; // Importa el Footer

const InicioProfesor = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {/* Agrega el Header aquí */}
      <Header />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 flex-grow mb-24 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a tu espacio de enseñanza!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestros cursos de inglés y comienza a transformar la vida de tus estudiantes.
          </p>
        </div>

        <div className="p-6 rounded-lg border bg-pink-100 text-gray-700 border-gray-300 shadow-md mb-8">
          <h2 className="text-3xl font-bold">Su perfil aun está en proceso de autorización para ejercer el rol de profesor</h2>
          <h3 className="text-2xl"><br/>Nuestros administradores pronto se encargarán de su acceso <br/> Le agradecemos por su paciencia</h3>
        </div>
        
        {/* Nota para profesores de Jelly Jobs */}
        <div className="p-6 rounded-lg border bg-blue-50 text-gray-700 border-blue-200 shadow-md">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Información para profesores derivados de Jelly Jobs</h3>
          <p className="text-gray-600">
            Si usted es profesor/a derivado de Jelly Jobs y ya ha sido autorizado, debe hacer clic en 
            <span className="font-semibold text-blue-700"> "Olvidé mi contraseña" </span> 
            en la pantalla de inicio de sesión para recuperarla y poder ingresar a su cuenta.
          </p>
         
        </div>
      </main>
      
      {/* Footer al final */}
      <Footer className="mt-12" />
    </div>
  );
};

export default InicioProfesor;