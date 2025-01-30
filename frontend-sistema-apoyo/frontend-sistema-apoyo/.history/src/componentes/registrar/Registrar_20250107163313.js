import React, { useState } from "react";
import './Registrar.css'

function Registrar() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const validateField = (fieldName, value) => {
    let newErrors = { ...errors };
    
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[0-9])/.test(value)) {
          newErrors.password = 'Password must contain at least one number';
        } else {
          delete newErrors.password;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = () => {
    let currentField = '';
    switch (step) {
      case 1:
        currentField = 'name';
        break;
      case 2:
        currentField = 'email';
        break;
      case 3:
        currentField = 'password';
        break;
      default:
        return false;
    }
    
    setTouched(prev => ({ ...prev, [currentField]: true }));
    return validateField(currentField, formData[currentField]);
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Here you would typically make an API call to register the user
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-sm ${step >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>Name</span>
          <span className={`text-sm ${step >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>Email</span>
          <span className={`text-sm ${step >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>Password</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">What's your name?</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                placeholder="Enter your name"
                className={`mt-1 block w-full rounded-md border ${
                  touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {touched.name && errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">What's your email?</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="Enter your email"
                className={`mt-1 block w-full rounded-md border ${
                  touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Create a password</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password*
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                placeholder="Create a password"
                className={`mt-1 block w-full rounded-md border ${
                  touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {touched.password && errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
          )}
          <button
            type={step === 3 ? 'submit' : 'button'}
            onClick={step === 3 ? undefined : handleNext}
            className="ml-auto px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {step === 3 ? 'Register' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registrar;