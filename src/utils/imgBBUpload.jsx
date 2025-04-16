// export const uploadImageToImgBB = async (blob) => {
//     const file = new File([blob], "logo.png", { type: "image/png" });
//     const formData = new FormData();
//     formData.append('image', file);

import { IMGBB_API_KEY } from "./constants";

export const uploadImageToImgBB = async (imageBlob) => {
    const formData = new FormData();
    formData.append('image', imageBlob);

    // Note: You'll need to get an API key from imgBB (free tier available)
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Image upload failed');
    }

    const data = await response.json();
    console.log(data, "DATAA")
    return data.data.url; // Returns the URL of the uploaded image
};

export const blobUrlToBlob = async (blobUrl) => {
    const response = await fetch(blobUrl);
    return await response.blob(); // Returns the actual Blob
};
