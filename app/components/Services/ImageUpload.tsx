import axios from "axios";

const MAX_FILE_SIZE_MB = 10;

const ImageUpload = async (event:any, uploadPreset:any, cloudname:any) => {
  const file = event.target.files[0];
  
  // Check if the file size exceeds the maximum allowed size (10 MB)
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return  `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`
  }
  else{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", `${uploadPreset}`);
    
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error("Error uploading file: ", error);
      return "Error";
    }
  }

};

export default ImageUpload;
