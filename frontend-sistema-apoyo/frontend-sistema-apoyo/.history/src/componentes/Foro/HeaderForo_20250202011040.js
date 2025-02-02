const Header = () => {
    return (
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-gray-700">EDU</span>
                <span className="text-teal-500">-MATCH</span>
                <span className="inline-block w-6 h-6 ml-1">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path
                      d="M12 3L3 8L12 13L21 8L12 3Z"
                      fill="#FF69B4"
                      stroke="#FF69B4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 16L12 21L21 16"
                      stroke="#FF69B4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 12L12 17L21 12"
                      stroke="#FF69B4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
  
            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              <a
                href="#"
                className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
              >
                MIS CURSOS
              </a>
              <a
                href="#"
                className="text-teal-500 font-semibold hover:text-teal-600 transition-colors"
              >
                Alumnos
              </a>
            </nav>
  
            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <span className="text-white">Maria A</span>
              <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white font-medium">
                M
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;