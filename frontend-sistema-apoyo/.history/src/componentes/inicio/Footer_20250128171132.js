const UpdatedFooter = ({ socialIcons, footerSections }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSocialClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {Object.values(footerSections).map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-semibold text-lg mb-4">Redes Sociales</h3>
            <div className="flex space-x-4">
              {socialIcons.map((icon, index) => {
                const IconComponent = icon.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(icon.link)}
                    className={`text-gray-400 ${icon.color} transition-colors`}
                    aria-label={icon.name}
                  >
                    <IconComponent size={24} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              © {new Date().getFullYear()} English Learning Platform. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
