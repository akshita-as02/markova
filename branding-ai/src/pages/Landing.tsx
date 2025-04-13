import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartGenerating = () => {
    if (user) {
      navigate('/generate');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build a Bold Brand with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Generate logos, taglines, and campaign ideas instantly
          </p>
          <button
            onClick={handleStartGenerating}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            {user ? 'Start Generating' : 'Sign In to Generate'}
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Smart Branding in 3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-gray-900">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Enter your company's name, mission & vision</h3>
            </div>
            <div className="text-center text-gray-900">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Choose your industry & design style</h3>
            </div>
            <div className="text-center text-gray-900">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Get AI-generated branding assets</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-gray-900">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900">Logo designs</h3>
            </div>
            <div className="text-center text-gray-900">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold text-gray-900">Unique taglines</h3>
            </div>
            <div className="text-center text-gray-900">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-xl font-semibold text-gray-900">Campaign content ideas</h3>
            </div>
            <div className="text-center text-gray-900">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900">Brand-ready exports</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Made For */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Perfect for...</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-gray-900">
              <h3 className="text-xl font-semibold text-gray-900">Startup founders</h3>
            </div>
            <div className="text-center text-gray-900">
              <h3 className="text-xl font-semibold text-gray-900">Small business owners</h3>
            </div>
            <div className="text-center text-gray-900">
              <h3 className="text-xl font-semibold text-gray-900">Freelancers & designers</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use This */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Because Branding Shouldn't Be Hard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-gray-900">
              <h3 className="text-xl font-semibold">No design skills needed</h3>
            </div>
            <div className="text-center text-gray-900">
              <h3 className="text-xl font-semibold">Fast, personalized results</h3>
            </div>
            <div className="text-center text-gray-900">
              <h3 className="text-xl font-semibold">Backed by AI creativity</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 