<div className="flex justify-center">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => {
      setErrors({
        submit: 'Falló el inicio de sesión con Google'
      });
    }}
    useOneTap
    render={({ onClick }) => (
      <button
        type="button"
        onClick={onClick}
        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
      >
        <FaGoogle className="w-5 h-5 mr-2" />
        <span>Continuar con Google</span>
      </button>
    )}
  />
</div>
