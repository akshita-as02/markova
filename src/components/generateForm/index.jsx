import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from '../services/api';
import './generateForm.css';
import { useAuth } from '../../contexts/authContext';
import { database } from '../../firebase/firebase';
import { ref, push, set } from 'firebase/database';
// import { hf_image_blob } from '../../utils';
import ImageGenerator from '../imageGenerator';
import { generateImageFromText, generateTagline } from '../../utils/huggingface';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { blobUrlToBlob, uploadImageToImgBB } from '../../utils/imgBBUpload';


const INDUSTRY_OPTIONS = ['AI', 'Gaming', 'Blockchain', 'Healthcare', 'Art', 'Music'];
const STYLE_OPTIONS = ['Retro', 'Futuristic', 'Minimalistic', 'Bold'];

export default function GenerateForm() {
    const [step, setStep] = useState(1);
    const [brandInfo, setBrandInfo] = useState({
        brandName: '',
        mission: '',
        vision: '',
        industries: [],
        style: '',
        tagline: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { userLoggedIn, currentUser } = useAuth();
    const [isGeneratingTagline, setIsGeneratingTagline] = useState(false);
    // console.log("CURRENT USER", currentUser)
    const navigate = useNavigate();


    const handleGenerateTagline = async () => {
        if (brandInfo.industries.length === 0) {
            setError('Please select at least one industry first');
            return;
        }

        setIsGeneratingTagline(true);
        setError('');

        try {
            const tagline = await generateTagline(brandInfo);
            setBrandInfo(prev => ({
                ...prev,
                tagline
            }));
        } catch (err) {
            console.error('Tagline generation error:', err);
            setError('Failed to generate tagline. Please try again.');
        } finally {
            setIsGeneratingTagline(false);
        }
    };

    const handleRegenerate = async () => {
        brandInfo.tagline = ''; // Clear the existing tagline
        handleGenerateTagline(); // Simply call the same function again
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setIsLoading(true);
        setError('');

        const minLoadingTime = 3000; // 3 seconds
        const startTime = Date.now();
        try {
            const prompt = `Generate a unique logo for ${brandInfo.brandName} and includes these ${brandInfo.industries.join(', ')} industries having mission: ${brandInfo.mission}, vision: ${brandInfo.vision}. Make it inspiring, creative, and catchy.`

            // const prompt = `Logo for ${brandInfo.brandName} in ${brandInfo.style} style in 4K`;
            const { imageUrl } = await generateImageFromText(prompt);
            console.log(imageUrl, "IMAGE URL")

            const imageBlob = await blobUrlToBlob(imageUrl);
            console.log(imageBlob, "IMAGE BLOB")

            const uploadedImageUrl = await uploadImageToImgBB(imageBlob);

            console.log(uploadedImageUrl, "uploadedImageUrl")


            // Create a reference to the 'brands' collection in Firebase
            const brandsRef = ref(database, 'brands');
            // Add the brand data to Firebase with a unique key
            const newBrandRef = push(brandsRef);
            const brandId = newBrandRef.key; // Get the unique ID generated by Firebase

            // Use set instead of push to write data at the specific reference
            await set(newBrandRef, {
                ...brandInfo,
                brandId: brandId, // Store the ID within the data 
                userId: currentUser.uid,
                imageUrl: uploadedImageUrl,
                createdAt: new Date().toISOString()
            });

            const elapsedTime = Date.now() - startTime;
            const remainingTime = minLoadingTime - elapsedTime;

            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }


            // localStorage.setItem('lastBrandId', brandId);

            // // Navigate to results page with the brand ID
            navigate(`/results`);
        } catch (err) {
            console.error('Firebase error:', err);
            setError('Failed to save brand information. Please try again.');
        } finally {
            setIsLoading(false);
            setIsProcessing(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrandInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIndustryChange = (industry) => {
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

    const handleStyleChange = (style) => {
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

    if (!userLoggedIn) {
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
                                                className={`option-card ${brandInfo.industries.includes(industry) ? 'selected' : ''
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

                                    {/* Add tagline section */}
                                    {brandInfo.industries.length > 0 && (
                                        <div className="mt-6">
                                            <button
                                                type="button"
                                                onClick={brandInfo.tagline.length > 0 ? handleRegenerate : handleGenerateTagline}
                                                disabled={isGeneratingTagline}
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 mb-4"
                                            >
                                                {isGeneratingTagline ? 'Generating...' : brandInfo.tagline.length > 0 ? "Regenerate Tagline" : 'Generate Tagline'}
                                            </button>

                                            {brandInfo.tagline && (
                                                <div className="bg-blue-50 p-4 rounded-md">
                                                    <p className="text-sm font-medium text-gray-700">Your Tagline:</p>
                                                    <p className="text-lg font-semibold text-blue-600 mt-1">"{brandInfo.tagline}"</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

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
                                            disabled={brandInfo.industries.length === 0 && !brandInfo.tagline}
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
                                                className={`option-card ${brandInfo.style === style ? 'selected' : ''
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