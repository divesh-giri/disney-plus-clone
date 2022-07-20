import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "../features/movie/movie-slice";
import userSliceReducer from "../features/user/user-slice";
export default configureStore({
  reducer: { user: userSliceReducer, movie: movieSliceReducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
