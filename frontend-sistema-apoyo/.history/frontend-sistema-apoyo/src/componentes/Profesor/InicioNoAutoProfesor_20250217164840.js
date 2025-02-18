import React from "react";
import Header from "./HeaderNoAutoProfesor"; // Importa el Header
import Footer from "./FooterProfesor"; // Importa el Footer


const InicioProfesor = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {/* Agrega el Header aquí */}
      <Header />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-8 py-12 flex-grow mb-24 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a tu espacio de enseñanza!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestros cursos de inglés y comienza a transformar la vida de tus estudiantes.
          </p>
        </div>

        <div className={`p-6 rounded-lg border bg-pink-100 text-gray-700 border-gray-300" shadow-md`}>
          <h2 className="text-3xl font-bold">Su perfil aun esta en proceso de autorizacion para ejercer el rol de profesor </h2>
            <h3 className="text-2xl"><br/>Nuestros administradores pronto se encargaran de su acceso <br/> Le agradecemos por su paciencia</h3>
        </div>
      </main>
      {/* Footer al final */}
      <Footer className="mt-12" />
    </div>
  );
};

export default InicioProfesor;