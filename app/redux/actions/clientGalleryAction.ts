const UPLOAD_PHOTO = "UPLOAD_PHOTO";
const INITIALZE_CG = "INITIALZE_CG";
const DELETE_PHOTO = "DELETE_PHOTO";
const DELETE_FOLDER = "DELETE_FOLDER";
const CHANGE_FOLDER_NAME = "CHANGE_FOLDER_NAME";
const CREATE_FOLDER = "CREATE_FOLDER";
const INITIALZE_FOLDER="INITIALZE_FOLDER"


// Actions
export const inititalizeClientGallery = (payload: any) => ({
  type: INITIALZE_CG,
  payload, // Include the payload here
});

export const deleteAPhotoClientGallery = (payload: any) => ({
  type: DELETE_PHOTO,
  payload, // Include the payload here
});

export const deleteAFolderClientGallery = (payload: any) => ({
  type: DELETE_FOLDER,
  payload, // Include the payload here
});
export const changeFolderNameClientGallery = (payload: any) => ({
  type: CHANGE_FOLDER_NAME,
  payload, // Include the payload here
});
export const createFolderClientGallery = (payload: any) => ({
  type: CREATE_FOLDER,
  payload, // Include the payload here
});

export const uploadPhotoClientGallery = (payload:any) => ({
  type:UPLOAD_PHOTO  ,
  payload
});
export const initializeFolderClientGallery = (payload:any) => ({
  type:INITIALZE_FOLDER  ,
  payload
});