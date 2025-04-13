import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './GenerateForm.css';

interface BrandInfo {
  brandName: string;
  mission: string;
  vision: string;
  industries: string[];
  style: string;
}

const INDUSTRY_OPTIONS = ['AI', 'Gaming', 'Blockchain', 'Healthcare', 'Art', 'Music'];
const STYLE_OPTIONS = ['Retro', 'Futuristic', 'Minimalistic', 'Bold'];

export default function GenerateForm() {
  const [step, setStep] = useState(1);
  const [brandInfo, setBrandInfo] = useState<BrandInfo>({
    brandName: '',
    mission: '',
    vision: '',
    industries: [],
    style: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsLoading(true);
    setError('');
  
    try {
      await api.post('/brand', brandInfo);
      navigate('/results');
    } catch (err) {
      setError('Failed to save brand information. Please try again.');
      setIsProcessing(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBrandInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIndustryChange = (industry: string) => {
    setBrandInfo(prev => {
      const industries = prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : prev.industries.length < 3
          ? [...prev.industries, industry]
          : prev.industries;
      
      return {
        ...prev,
        industries
      };
    });
  };

  const handleStyleChange = (style: string) => {
    setBrandInfo(prev => ({
      ...prev,
      style
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  if (!user) {
    return null;
  } 

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Generating your brand assets...</p>
          <p className="text-sm text-gray-500 mt-2">Please hold on while we process your information.</p>
        </div>
      </div>
    );
  }  

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              {step === 1 ? 'Step 1/3' : 
               step === 2 ? 'Step 2/3' : 
               'Step 3/3'}
            </h3>

            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
              <div className="progress-labels">
                <span className={`progress-label ${step === 1 ? 'active' : ''}`}>Brand</span>
                <span className={`progress-label ${step === 2 ? 'active' : ''}`}>Industry</span>
                <span className={`progress-label ${step === 3 ? 'active' : ''}`}>Style</span>
              </div>
            </div>

            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              {step === 1 ? 'Tell us about your brand' : 
               step === 2 ? 'What is your industry?' : 
               'How would you like your logo to look?'}
            </h3>

            <div className="mt-5">
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                  <div>
                    <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
                      Brand Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="brandName"
                        id="brandName"
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={brandInfo.brandName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mission" className="block text-sm font-medium text-gray-700">
                      Mission Statement
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="mission"
                        name="mission"
                        rows={3}
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={brandInfo.mission}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="vision" className="block text-sm font-medium text-gray-700">
                      Vision Statement
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="vision"
                        name="vision"
                        rows={3}
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={brandInfo.vision}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-500 mb-4">
                    Select up to 3 options that describe your brand's industry most closely
                  </p>
                  
                  <div className="option-grid">
                    {INDUSTRY_OPTIONS.map((industry) => (
                      <div
                        key={industry}
                        className={`option-card ${
                          brandInfo.industries.includes(industry) ? 'selected' : ''
                        }`}
                        onClick={() => handleIndustryChange(industry)}
                      >
                        <div className="glow" />
                        <div className="option-content">
                          {industry}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={brandInfo.industries.length === 0}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-500 mb-4">
                    Select a style that matches your desired branding style most closely
                  </p>
                  
                  <div className="option-grid">
                    {STYLE_OPTIONS.map((style) => (
                      <div
                        key={style}
                        className={`option-card ${
                          brandInfo.style === style ? 'selected' : ''
                        }`}
                        onClick={() => handleStyleChange(style)}
                      >
                        <div className="glow" />
                        <div className="option-content">
                          {style}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!brandInfo.style}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}