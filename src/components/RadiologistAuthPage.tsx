import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiShield, FiGlobe, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const RadiologistAuthPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "The 5C Network platform allows me to report studies from anywhere, anytime. The workflow is smooth and efficient.",
      name: "Dr. Arvind Menon",
      role: "Consultant Radiologist",
      company: "Freelance"
    },
    {
      quote: "I can focus on diagnosis without worrying about technical hassles. The platform is built for radiologists!",
      name: "Dr. Sneha Rao",
      role: "Radiologist",
      company: "City Imaging Centre"
    },
    {
      quote: "The case assignment and reporting tools are top-notch. My productivity has increased significantly.",
      name: "Dr. Karthik Iyer",
      role: "Senior Radiologist",
      company: "Metro Hospitals"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Radiologist Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Medical Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-medical-sidebar to-medical-blue-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-lg"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
          {/* Logo and Header */}
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-medical-blue-dark font-bold text-2xl">C</span>
              </div>
              <span className="text-3xl font-bold">CyberTechNinja</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-medical-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Borderless Radiology Platform
            </h1>
            
            <p className="text-lg text-gray-200 mb-8">
              Welcome, Radiologist! Report studies from anywhere, anytime.
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              CyberTechNinja empowers radiologists with seamless access to cases, efficient reporting tools, and a collaborative environment to deliver the best patient care.
            </p>
          </div>

          {/* Testimonials */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <p className="text-gray-200 italic mb-4 text-lg leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="border-l-4 border-medical-yellow-300 pl-4">
                  <p className="font-semibold text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in">
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-medical-blue/10 to-medical-blue-dark/10 px-4 py-2 rounded-full">
                <FiShield className="w-5 h-5 text-medical-blue" />
                <span className="text-sm font-semibold text-medical-blue">SECURE PLATFORM</span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                Radiologist Login
              </h2>
              <p className="text-gray-600">Sign in to access your radiology dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-medical-blue hover:text-medical-blue-dark transition-colors">
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-medical-blue to-medical-blue-dark hover:from-medical-blue-dark hover:to-medical-blue text-white py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                © Copyright 2024 - 2025 by CyberTechNinja. All Rights Reserved.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RadiologistAuthPage;