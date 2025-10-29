import cloudinary from "#config/cloudinary.js";
import fs from 'fs/promises';

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "blogs",           
      transformation: [
        {
          aspect_ratio: "16:9",  
          crop: "fill",          
          quality: "auto",       
          fetch_format: "auto",  
        },
      ],
    });

    await fs.unlink(filePath).catch(() => {});
    return result.secure_url;

  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
