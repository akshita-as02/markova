import { useState } from 'react';
import { useImageGeneration } from '../../hooks/useImageGeneration';
const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('Astronaut riding a horse');
    const { generateImage, imageData, isLoading, error } = useImageGeneration();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        await generateImage(prompt);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your image..."
                    style={{ padding: '8px', width: '300px', marginRight: '10px' }}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ padding: '8px 16px' }}
                >
                    {isLoading ? 'Generating...' : 'Generate Image'}
                </button>
            </form>

            {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

            {imageData && (
                <div>
                    <div style={{ marginBottom: '10px' }}>
                        <img
                            src={imageData.imageUrl}
                            alt={prompt}
                            style={{ maxWidth: '100%', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <p>Image size: {(imageData.size / 1024).toFixed(2)} KB</p>
                        <p>Image type: {imageData.type}</p>
                    </div>
                    <a
                        href={imageData.imageUrl}
                        download={`${prompt.replace(/\s+/g, '-')}.png`}
                        style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: '#4CAF50',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        Download Image
                    </a>
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;