import { createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "types";
import { loginThunk } from ".";

type QuanLyNguoiDungInitialState = {
  accessToken?: string;
  userLogin?: UserLogin;
  // UserLogin từ file QuanLyNguoiDung
  isFetchingLogin?: boolean;
};

const initialState: QuanLyNguoiDungInitialState = {
  accessToken: localStorage.getItem("ACCESSTOKEN") || undefined,
  isFetchingLogin: false,
};

const quanLyNguoiDungSlice = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // xử lý action bất đồng bộ (call, api)
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isFetchingLogin = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isFetchingLogin = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        console.log("payload: ", payload);
        // lưu accessToken xuống localstorage
        localStorage.setItem("ACCESSTOKEN", payload?.accessToken);
        // set lại user
        state.userLogin = payload;
        // state.accessToken = payload
      });
  },
});

export const {
  actions: quanLyNguoiDungActions,
  reducer: quanLyNguoDungReducer,
} = quanLyNguoiDungSlice;
