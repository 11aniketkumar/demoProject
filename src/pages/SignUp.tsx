import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chrome, Apple } from 'lucide-react';
import { SocialButton } from '../components/SocialButton';
import { Carousel } from '../components/Carousel';
import { RegistrationForm } from '../components/RegistrationForm';

const slides = [
  {
    heading: "Secure Authentication",
    text: "Join our platform with enterprise-grade security and seamless user experience.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60"
  },
  {
    heading: "Smart Collaboration",
    text: "Connect and collaborate with team members efficiently in real-time.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60"
  },
  {
    heading: "Data Analytics",
    text: "Powerful insights and analytics to help you make better decisions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
  }
];

export default function SignUp() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/preferences');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-1/2 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
            <p className="mt-2 text-sm text-gray-600">Join our platform today!</p>
          </div>

          <div className="flex gap-4">
            <SocialButton icon={<Chrome className="w-5 h-5" />} label="Google" />
            <SocialButton icon={<Apple className="w-5 h-5" />} label="Apple" />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <RegistrationForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      <div className="w-1/2 relative">
        <Carousel
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          autoRotate={true}
          rotationInterval={5000}
        />
      </div>
    </div>
  );
}