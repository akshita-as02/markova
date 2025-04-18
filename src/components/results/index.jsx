import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { database } from '../../firebase/firebase';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function ResultsPage() {
    const { userLoggedIn, currentUser } = useAuth();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoggedIn) {
            navigate('/login');
            return;
        }

        const fetchBrands = async () => {
            try {
                const brandsRef = ref(database, 'brands');
                const userBrandsQuery = query(
                    brandsRef,
                    orderByChild('userId'),
                    equalTo(currentUser.uid)
                );

                onValue(userBrandsQuery, (snapshot) => {
                    const brandsData = [];
                    snapshot.forEach((childSnapshot) => {
                        brandsData.push({
                            id: childSnapshot.key,
                            ...childSnapshot.val()
                        });
                    });
                    setBrands(brandsData);
                    setLoading(false);
                });
            } catch (err) {
                setError('Failed to load brands');
                setLoading(false);
                console.error(err);
            }
        };

        fetchBrands();
    }, [userLoggedIn, currentUser, navigate]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <div className="w-9 h-9 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading your brands...</p>
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="px-4 py-8 mx-auto main-section">
            {/* <h1 className="mb-8 text-3xl font-bold text-gray-800">Your Generated Brands</h1> */}

            {brands.length === 0 ? (
                <div className="p-8 text-center">
                    <p className="mb-4 text-gray-600">You haven't generated any brands yet.</p>
                    <button
                        onClick={() => navigate('/generate')}
                        className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Generate Your First Brand
                    </button>
                </div>
            ) : (
                <div className="flex flex-wrap justify-start gap-6 px-4 py-8 mt-12">
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="flex flex-col w-full bg-white rounded-lg shadow-md overflow-hidden sm:w-[350px]"
                        >
                            {/* Image Section */}
                            <div className="flex items-center justify-center h-64 bg-gray-100 p-4">
                                <img
                                    src={brand.imageUrl}
                                    alt={`${brand.brandName} logo`}
                                    className="object-contain max-h-full max-w-full"
                                    onError={(e) => e.target.src = '/placeholder-image.png'}
                                />
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-col flex-1 p-6">
                                {/* Brand Name and Tags */}
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 truncate">{brand.brandName}</h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {brand.industries.map((industry, i) => (
                                            <span key={i} className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-md">
                                                {industry}
                                            </span>
                                        ))}
                                        <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-md">
                                            {brand.style} Style
                                        </span>
                                    </div>
                                </div>

                                {/* Mission/Vision with Scroll */}
                                <div className="flex-1 overflow-y-auto max-h-[180px] pr-2 custom-scrollbar">
                                    <h3 className="text-sm font-medium text-gray-800">Mission</h3>
                                    <p className="mt-1 mb-3 text-sm text-gray-600 break-words">
                                        {brand.mission}
                                    </p>
                                    <h3 className="text-sm font-medium text-gray-800">Vision</h3>
                                    <p className="mt-1 text-sm text-gray-600 break-words">
                                        {brand.vision}
                                    </p>
                                </div>

                                {/* Download Button */}
                                <a
                                    href={brand.imageUrl}
                                    download
                                    className="mt-4 w-full px-4 py-2 text-sm font-medium text-center text-white rounded-md hover:bg-blue-600 transition-colors" style={{ backgroundColor: "#6366f1" }}
                                >
                                    Download Logo
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}