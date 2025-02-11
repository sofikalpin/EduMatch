import React, { useState } from "react";
import './Registrar.css';
import logo from '../../logo/LogoInicio.png';


export const Registrar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const validateStep = () => {
    if (step === 1 && !formData.name.trim()) {
      return false;
    }
    if (step === 2 && !formData.email.trim()) {
      return false;
    }
    if (step === 3 && !formData.password.trim()) {
      return false;
    }
    return true;
  };


  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };


  return (
    <div className="container">
      <div className="progress-container">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      <main className="main-content">
        {step === 1 && (
          <div className="form-container">
            <h1 className="question">What's your name?</h1>
            <div className="input-group">
              <label className="label">
                *Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="First name"
                className="input"
              />
              {!formData.name.trim() && (
                <span className="required-message">This field is required.</span>
              )}
            </div>
            <button
              className="continue-button"
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        )}
        {/* ... rest of the steps remain the same ... */}
      </main>
    </div>
  );
);