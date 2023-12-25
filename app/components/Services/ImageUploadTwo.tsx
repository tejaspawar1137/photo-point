import { uploadFile } from "@uploadcare/upload-client";
import Compressor from 'compressorjs';
import CustomAlert from "../Alert/Alert";

const MAX_FILE_SIZE_MB = 20;

const compressAndUpload = async (file:any,ak:any) => {
  const fileSizeInMb=file.size/ (1024 * 1024); 
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: fileSizeInMb<=6?0.3:0.2,
      success: async (compressedFile) => {
        try {
          const result = await uploadFile(compressedFile, {
            publicKey: ak,
            store: "auto",
            metadata: {
              subsystem: "uploader",
              pet: "cat",
            },
          });
          resolve(result.cdnUrl);
        } catch (error) {
          reject(error);
        }
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};

const ImageUploadTwo = async (event:any, ak:any) => {
  let url = "";

  const selectedFile = event.target.files[0];

  if (!selectedFile) {
    CustomAlert("Please select a file first","warning");
    return;
  }

  if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`;
  }

  try {
    const compressedUrl:any = await compressAndUpload(selectedFile,ak); 
    url = compressedUrl;
    return url;
  } catch (error) { 
    return "Error";
  }
};

export default ImageUploadTwo;
