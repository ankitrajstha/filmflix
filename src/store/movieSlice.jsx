import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "5fa7d14ab8dfcf5ffb154251dbe152ca";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
  );
  const data = await response.json();
  console.log(API_KEY);
  console.log(data.results);
  return data.results;
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    selectedMovie: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedMovie } = movieSlice.actions;

export default movieSlice.reducer;
