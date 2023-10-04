import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "types";
import { getMovieListThunk } from ".";

type QuanLyPhimInitialState = {
  movieList?: Movie[] | undefined;
  isFetchingMovieList?: boolean;
};

const initialState: QuanLyPhimInitialState = {};

const quanLyPhimSlice = createSlice({
  name: "quanLyphim",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMovieListThunk.pending, (state) => {// đang call
        state.isFetchingMovieList = true;
      })
      .addCase(getMovieListThunk.fulfilled, (state, { payload }) => {
        state.movieList = payload;
        state.isFetchingMovieList = false;
      })
      .addCase(getMovieListThunk.rejected, (state) => {
        state.isFetchingMovieList = false;
      });
  },
});

export const { actions: quanLyPhimActions, reducer: quanLyPhimReducer } =
  quanLyPhimSlice;
