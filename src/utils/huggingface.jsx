import { InferenceClient } from "@huggingface/inference";
import { HF_API_KEY } from "./constants";

// const HF_API_KEY = process.env.REACT_APP_HF_API_KEY;
const client = new InferenceClient(HF_API_KEY);

export const generateImageFromText = async (prompt, options = {}) => {
    const defaultOptions = {
        provider: "replicate",
        model: "black-forest-labs/FLUX.1-dev",
        parameters: { num_inference_steps: 5 },
        ...options
    };

    try {
        const blob = await client.textToImage({
            ...defaultOptions,
            inputs: prompt
        });

        // Create object URL from the blob
        const imageUrl = URL.createObjectURL(blob);
        return {
            blob,        // Original blob data
            imageUrl,    // URL for displaying in img tag
            size: blob.size,
            type: blob.type
        };
    } catch (error) {
        console.error("Image generation failed:", error);
        throw new Error("Failed to generate image");
    }
};