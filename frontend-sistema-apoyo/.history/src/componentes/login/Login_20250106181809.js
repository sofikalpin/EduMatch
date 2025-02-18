import React from "react";
import "./Login.css";
import { validateEmail,validatePassword, handleGoogleSignIn, handleLogin,saveUserSession} from "./LoginUtils";  
import logo from "../../logo/LogoInicio.png";

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await handleLogin({
        email: formData.email,
        password: formData.password
      });
      
      saveUserSession(response.token, formData.rememberMe);
      // Handle successful login (e.g., redirect to dashboard)
      
    } catch (error) {
      setErrors({
        submit: 'Invalid email or password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const response = await handleGoogleSignIn();
      saveUserSession(response.token, formData.rememberMe);
      // Handle successful Google sign-in
      
    } catch (error) {
      setErrors({
        submit: 'Google sign-in failed'
      });
    }
  };
const Login = () => {
  return (
    <div className="login-container">
      {/* Left Panel */}
      <div className="left-panel"></div>

      {/* Right Panel */}
      <div className="right-panel">
        {/* Logo */}
        <img src={logo} alt="Logo" className="logo" />
        <h3>Login</h3>
        <p>Welcome Back! Please enter your details.</p>
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <div className="remember-me">
            <label>
              <input type="checkbox" /> Remember me for 30 days
            </label>
            <a href="#forgot">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        <button className="register-button">Register</button>
        <div className="google-login">
          <button>Sign In with Google</button>
        </div>
        <p>
          Don't have an account? <a href="#signup">Sign up for free</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
