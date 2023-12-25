import axios from 'axios';
import Compressor from 'compressorjs';

const MAX_FILE_SIZE_MB = 20;

const ImageUpload = async (event:any, uploadPreset:any, cloudname:any) => {
  const file = event.target.files[0]; 
  const fileSizeInMb=file.size/ (1024 * 1024);
  const maxFileSizeInMB=MAX_FILE_SIZE_MB * 1024 * 1024;
  // Check if the file size exceeds the maximum allowed size (10 MB)
  if (file.size > maxFileSizeInMB) {
    return `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`;
  } else {
    // Compress the image using Compressor.js
    const compressedFile = await new Promise((resolve) => {
      new Compressor(file, {
        quality: fileSizeInMb<=6?0.3:0.2,
        success: (result) => {
          resolve(result);
        },
      });
    });

    const formData = new FormData();
    formData.append('file', (compressedFile as any));
    formData.append('upload_preset', `${uploadPreset}`);

    try {
      const response:any = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            // Calculate the file size in MB
            const fileSizeInMB = progressEvent.loaded / (1024 * 1024); 
          },
        }
      );
      return response.data.url;
    } catch (error) { 
      return 'Error';
    }
  }
};

export default ImageUpload;