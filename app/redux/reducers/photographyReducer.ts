const initialState: any = {
  photos: [],
};

const UPLOAD_PHOTO = "UPLOAD_PHOTO";
const INITIALZE = "INITIALZE";
const DELETE_PHOTO = "DELETE_PHOTO";
const DELETE_FOLDER = "DELETE_FOLDER";
const CHANGE_FOLDER_NAME = "CHANGE_FOLDER_NAME";
const CREATE_FOLDER = "CREATE_FOLDER";

export const photosReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INITIALZE:
      const fetchedPhotos = action.payload;
      if (Array.isArray(fetchedPhotos)) {
        return {
          ...state,
          photos: [...fetchedPhotos],
        };
      }
      case UPLOAD_PHOTO:
        const { Uurl, UfId } = action.payload;
        return {
          ...state,
          photos: state.photos.map((photo: any) => {
            if (photo._id === UfId) {
              return {
                ...photo,
                images: [...photo.images, Uurl],
              };
            }
            return photo;
          }),
        };
      
    case DELETE_PHOTO:
      const { id, url } = action.payload;
      return {
        ...state,
        photos: state.photos.map((e: any) => {
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
        photos: state.photos.map((e: any) => {
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
      console.log(folder)
      return {
        ...state,
        photos: [...state.photos, folder], // Creates a new array with the new folder appended
      };
    case DELETE_FOLDER:
      const fId = action.payload;
      return {
        ...state,
        photos: state.photos.filter((e: any) => e._id !== fId),
      };

    default:
      return state;
  }
};
