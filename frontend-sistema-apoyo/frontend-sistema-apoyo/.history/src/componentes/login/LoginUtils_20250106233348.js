// loginUtils.js
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  export const handleLogin = async (credentials) => {
    try {
      // Here you would make your API call to authenticate
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };
  
  export const handleGoogleSignIn = async () => {
    try {
      // Implement Google OAuth logic here
      const response = await fetch('/api/auth/google', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Google sign-in failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Google authentication failed');
    }
  };
  
  export const saveUserSession = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('userToken', token);
    } else {
      sessionStorage.setItem('userToken', token);
    }
  };