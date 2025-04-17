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

export const generateTagline = async (brandInfo) => {
    console.log("Brand Info:", brandInfo);
    try {

        // const prompt = `Generate a unique, catchy tagline for ${brandInfo.brandName} (${brandInfo.industries.join(', ')}). Mission: ${brandInfo.mission}. Vision: ${brandInfo.vision}. Keep it under 10 words. Give a only tagline without any additional text as i have to display.`;
        const prompt = `Generate a unique, memorable, and concise tagline under 10 words for ${brandInfo.brandName} in ${brandInfo.industries.join(', ')} industry, mission: ${brandInfo.mission}, vision: ${brandInfo.vision}. Make it inspiring, creative, and catchy.Only output the tagline.`

        const response = await client.textGeneration({
            model: "gpt2",
            inputs: prompt,
            parameters: {
                max_new_tokens: 20,
                return_full_text: false
            }
        });

        // Clean up the response
        let tagline = response.generated_text.trim();
        console.log("Generated tagline BEFORE REMOVING QUOTATION:", tagline);
        // Remove any quotation marks if present
        tagline = tagline.replace(/^"|"$/g, '');
        console.log("Generated tagline AFTER REMOVING QUOTATION:", tagline);
        return tagline;
    } catch (error) {
        console.error("Tagline generation failed:", error);
        throw new Error("Failed to generate tagline");
    }
};