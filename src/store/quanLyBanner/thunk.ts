import { createAsyncThunk } from "@reduxjs/toolkit";
import { bannerServices } from "services/quanLyPhim";
// import { sleep } from "utils";

export const getBannerList = createAsyncThunk(
  "quanLyBanner/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const data = await bannerServices.getBanners();
      // await sleep(2000);
      // console.log({ data });
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
