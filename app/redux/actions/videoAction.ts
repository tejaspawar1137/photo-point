const UPLOAD_VIDEO = "UPLOAD_VIDEO";
const INITIALZE = "INITIALZE";
const DELETE_VIDEO = "DELETE_VIDEO";
const DELETE_FOLDER = "DELETE_FOLDER";
const CHANGE_FOLDER_NAME = "CHANGE_FOLDER_NAME";
const CREATE_FOLDER = "CREATE_FOLDER";


// Actions
export const inititalizeVideography = (payload: any) => ({
  type: INITIALZE,
  payload, // Include the payload here
});

export const deleteAVideo = (payload: any) => ({
  type: DELETE_VIDEO,
  payload, // Include the payload here
});

export const deleteAVideoFolder = (payload: any) => ({
  type: DELETE_FOLDER,
  payload, // Include the payload here
});
export const changeVideoFolderName = (payload: any) => ({
  type: CHANGE_FOLDER_NAME,
  payload, // Include the payload here
});
export const createVideoFolder = (payload: any) => ({
  type: CREATE_FOLDER,
  payload, // Include the payload here
});

export const uploadVideo = (payload:any) => ({
  type:UPLOAD_VIDEO  ,
  payload
});