import { uploadFile } from "@uploadcare/upload-client";

const MAX_FILE_SIZE_MB = 10;
const ImageUploadTwo = async (event: any, ak: any) => {
  let url: any = "";
  const selectedFile = event.target.files[0];
  // Check if the file size exceeds the maximum allowed size (10 MB)
  if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`;
  } else {
    try {
      if (!selectedFile) {
        alert("Please select a file first");
        return;
      }
      const fileData = new File([selectedFile], "filename.ext");
      const result = await uploadFile(fileData, {
        publicKey: ak,
        store: "auto",
        metadata: {
          subsystem: "uploader",
          pet: "cat",
        },
      });
      console.log(`URL: ${result.cdnUrl}`);
      url = result.cdnUrl;
      return url;
    } catch (error) {
      return "Error";
    }
  }
};

export default ImageUploadTwo;
