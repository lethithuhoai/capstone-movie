import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyPhimServices } from "services/quanLyPhim";
import { sleep } from "utils";

export const getMovieListThunk = createAsyncThunk(
  "quanLyPhim/getMovieList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await quanLyPhimServices.getMovieList("?maNhom=GP08");
      await sleep(2000);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
// export const getMovieListThunkUpcoming = createAsyncThunk(
//   "quanLyPhim/getMovieList",
//   async (payload:string, { rejectWithValue }) => {
//     try {
//       const data = await quanLyPhimUpcoming.getMovieList(`?maNhom=GP08?tenPhim=${payload}`);
//       await sleep(2000);
//       return data.data.content;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );
