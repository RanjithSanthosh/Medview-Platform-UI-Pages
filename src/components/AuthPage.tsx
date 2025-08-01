import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiShield, FiGlobe, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const AuthPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "CyberTechNinja's platform has revolutionized our cybersecurity training. The reports are delivered on time and in the format we require.",
      name: "Alex Chen",
      role: "Security Analyst",
      company: "TechCorp Solutions"
    },
    {
      quote: "The intuitive interface and cutting-edge technology make learning cybersecurity concepts much more engaging and effective.",
      name: "Sarah Johnson",
      role: "IT Manager",
      company: "Digital Defense Inc."
    },
    {
      quote: "CyberTechNinja has transformed how we approach security training. The platform is fast, smooth, and incredibly user-friendly.",
      name: "Michael Rodriguez",
      role: "CISO",
      company: "SecureNet Systems"
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
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Dark Blue with Content */}
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
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-medical-blue-dark font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold">CyberTechNinja</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-medical-yellow-300">
              India's Premier Cybersecurity Platform
            </h1>
            
            <p className="text-lg text-gray-200 mb-8">
              Ready to master the digital defense?
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              Fast, smooth, intuitive and supported by cutting-edge technology, 
              CyberTechNinja's cybersecurity platform brings out the best in you, 
              so that security professionals and organizations around the world 
              can make better decisions.
            </p>
          </div>

          {/* Testimonials */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <p className="text-gray-200 italic mb-4">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div>
                  <p className="font-semibold text-white">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <FiArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <FiShield className="w-6 h-6 text-medical-blue" />
                <span className="text-sm font-semibold text-gray-600">SECURE PLATFORM</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiGlobe className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">English</span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to CyberTechNinja!
              </h2>
              <p className="text-gray-600">Let's get you started</p>
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
                className="w-full bg-medical-blue hover:bg-medical-blue-dark text-white py-3 text-lg font-semibold transition-colors"
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

export default AuthPage; 