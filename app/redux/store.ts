import { configureStore } from "@reduxjs/toolkit"; 
// import { createLogger } from "redux-logger"; 
import { photosReducer } from "./reducers/photographyReducer";
import { userReducer } from "./reducers/userReducer";
import { clientGalleryReducer } from "./reducers/clientGalleryReducer";
import { videosReducer } from "./reducers/videoReducer";
 

// const logger = createLogger();

export const store = configureStore({
  reducer: {
    photosReducer,
    clientGalleryReducer,
    userReducer,
    videosReducer
  }
  // middleware: [logger],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
