import React, { useRef } from 'react';
import './Inicio.css'; 
import logo from '../../logo/LogoInicio.png';
import { Link } from 'react-router-dom'; 

export const Inicio = () => {
    <div className="flex flex-col items-start gap-2">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
        {number}
      </div>
      <div className="h-[2px] w-24 bg-gray-200" />
    </div>
    <h3 className="text-xl font-bold mt-2">{title}</h3>
    <p className="text-gray-600">{subtitle}</p>
  </div>
);

const FeatureCard = ({ title, description }) => (
  <div className="flex flex-col gap-2 max-w-sm">
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PreplyLanding = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <nav className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-8">
          <div className="font-bold text-2xl">Preply</div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600">Find tutors</a>
            <a href="#" className="text-gray-600">Corporate language training</a>
            <a href="#" className="text-gray-600">Become a tutor</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select className="p-2 rounded border">
            <option>English, ARS</option>
          </select>
          <button className="px-4 py-2 rounded border font-medium">Log In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-2 gap-12 mb-24">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl font-bold leading-tight">
            Make a living by teaching the largest community of learners worldwide
          </h1>
          
          <div className="flex gap-12">
            <StepCard 
              number="1"
              title="Sign up"
              subtitle="to create your tutor profile"
            />
            <StepCard 
              number="2"
              title="Get approved"
              subtitle="by our team in 5 business days"
            />
            <StepCard 
              number="3"
              title="Start earning"
              subtitle="by teaching students all over the world!"
            />
          </div>

          <button className="bg-emerald-400 text-black px-6 py-3 rounded-lg w-fit font-medium hover:bg-emerald-500 transition-colors">
            Create a tutor profile now
          </button>
        </div>

        <div className="relative">
          <img 
            src="/api/placeholder/600/400" 
            alt="Tutor teaching online" 
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-3 gap-12">
        <FeatureCard
          title="Set your own rate"
          description="Choose your hourly rate and change it any time. On average, tutors earn $15-25/hour."
        />
        <FeatureCard
          title="Teach anytime, anywhere"
          description="Decide when and how many hours you want to teach. Work from home or while traveling."
        />
        <FeatureCard
          title="Grow professionally"
          description="Attend professional development webinars and get guidance from our team."
        />
      </div>
    </div>
  );
};

export default Inicio;
