import { useState, useEffect } from 'react';
import { generateImageFromText } from '../utils/huggingface';

export const useImageGeneration = () => {
    const [imageData, setImageData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            if (imageData?.imageUrl) {
                URL.revokeObjectURL(imageData.imageUrl);
            }
        };
    }, [imageData]);

    const generateImage = async (prompt) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await generateImageFromText(prompt);
            setImageData(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { generateImage, imageData, isLoading, error };
};