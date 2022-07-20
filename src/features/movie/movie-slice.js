import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommend: null,
  newDisney: null,
  originals: null,
  trending: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.recommend = action.payload.recommends;
      state.newDisney = action.payload.newDisney;
      state.originals = action.payload.originals;
      state.trending = action.payload.trending;
    },
  },
});

export const { setMovies } = movieSlice.actions;
export default movieSlice.reducer;
