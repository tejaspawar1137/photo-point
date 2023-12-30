const initialState: any = {
    videos: [],
  };
  
  const UPLOAD_VIDEO= "UPLOAD_VIDEO";
  const INITIALZE = "INITIALZE";
  const DELETE_VIDEO = "DELETE_VIDEO";
  const DELETE_FOLDER = "DELETE_FOLDER";
  const CHANGE_FOLDER_NAME = "CHANGE_FOLDER_NAME";
  const CREATE_FOLDER = "CREATE_FOLDER";
  
  export const videosReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case INITIALZE:
        const fetchedvideos = action.payload;
        if (Array.isArray(fetchedvideos)) {
          return {
            ...state,
            videos: [...fetchedvideos],
          };
        }
        case UPLOAD_VIDEO:
          const { Uurl, UfId } = action.payload;
          return {
            ...state,
            videos: state.videos.map((photo: any) => {
              if (photo._id === UfId) {
                return {
                  ...photo,
                  images: [...photo.images, Uurl],
                };
              }
              return photo;
            }),
          };
        
      case DELETE_VIDEO:
        const { id, url } = action.payload;
        return {
          ...state,
          videos: state.videos.map((e: any) => {
            if ((e as any)._id === id) {
              return {
                ...e,
                images: (e as any).images.filter((img: any) => img.url !== url),
              };
            }
            return e;
          }),
        };
      case CHANGE_FOLDER_NAME:
        const { changeNameFid, newFolderName } = action.payload;
        return {
          ...state,
          videos: state.videos.map((e: any) => {
            if ((e as any)._id === changeNameFid) {
              return {
                ...e,
                name: changeNameFid === e._id ? newFolderName : e.name,
              };
            }
            return e;
          }),
        };
      case CREATE_FOLDER:
        const folder = action.payload; 
        return {
          ...state,
          videos: [...state.videos, folder], // Creates a new array with the new folder appended
        };
      case DELETE_FOLDER:
        const fId = action.payload;
        return {
          ...state,
          videos: state.videos.filter((e: any) => e._id !== fId),
        };
  
      default:
        return state;
    }
  };
  