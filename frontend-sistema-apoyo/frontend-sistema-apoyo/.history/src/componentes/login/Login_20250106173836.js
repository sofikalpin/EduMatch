import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      {/* Left Panel */}
      <div className="left-panel">
      </div>

      {/* Right Panel */}
      <div className="right-panel">
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
