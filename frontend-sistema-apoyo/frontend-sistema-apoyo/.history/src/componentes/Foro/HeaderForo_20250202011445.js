import React from "react";
import logo from "../../logo/LogoInicio.png";

const Header = () => {
    return (
      <div className="flex flex-col w-full">
        {/* Logo Section */}
        <div className="w-full bg-white py-2 px-4">
  <div className="max-w-7xl mx-auto flex items-center justify-center h-screen">
    <img 
      src={logo} 
      alt="EDU-MATCH" 
      className="h-10"
    />
  </div>
</div>
        
        {/* Navigation Bar */}
        <div className="w-full bg-teal-500">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Left Navigation */}
              <nav className="flex items-center space-x-8">
                <a
                  href="#"
                  className="text-yellow-300 font-bold hover:text-yellow-200 transition-colors"
                >
                  MIS CURSOS
                </a>
                <a
                  href="#"
                  className="text-white font-medium hover:text-gray-100 transition-colors"
                >
                  Alumnos
                </a>
              </nav>
  
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <span className="text-white">Maria A</span>
                <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white font-medium">
                  M
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;