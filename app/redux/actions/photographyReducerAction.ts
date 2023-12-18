const UPLOAD_PHOTO = "UPLOAD_PHOTO";
const INITIALZE = "INITIALZE";
const DELETE_PHOTO = "DELETE_PHOTO";
const DELETE_FOLDER = "DELETE_FOLDER";
const CHANGE_FOLDER_NAME = "CHANGE_FOLDER_NAME";
const CREATE_FOLDER = "CREATE_FOLDER";


// Actions
export const inititalizePhotography = (payload: any) => ({
  type: INITIALZE,
  payload, // Include the payload here
});

export const deleteAPhoto = (payload: any) => ({
  type: DELETE_PHOTO,
  payload, // Include the payload here
});

export const deleteAFolder = (payload: any) => ({
  type: DELETE_FOLDER,
  payload, // Include the payload here
});
export const changeFolderName = (payload: any) => ({
  type: CHANGE_FOLDER_NAME,
  payload, // Include the payload here
});
export const createFolder = (payload: any) => ({
  type: CREATE_FOLDER,
  payload, // Include the payload here
});

export const uploadPhoto = (payload:any) => ({
  type:UPLOAD_PHOTO  ,
  payload
});