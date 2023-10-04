import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UpdateUser, UserByAccessToken, UserLogin } from "types";
import { UpdateAccountThunk, getUserByAccessTokenThunk, loginThunk } from ".";
import { getAccessToken } from "utils";

type QuanLyNguoiDungInitialState = {
  accessToken?: string;
  userLogin?: UserLogin | UserByAccessToken | UpdateUser;
  // UserLogin từ file QuanLyNguoiDung
  isFetchingLogin?: boolean;
  isUpdatingUser: boolean;
};

const initialState: QuanLyNguoiDungInitialState = {
  accessToken: getAccessToken() || undefined,
  isFetchingLogin: false,
  isUpdatingUser: false,
};

const quanLyNguoiDungSlice = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  reducers: {
    logOut: (state, action: PayloadAction<string>) => {
      console.log("action:", action);

      state.accessToken = undefined;
      state.userLogin = undefined;
      localStorage.removeItem("ACCESSTOKEN");
    },
  },
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
        state.accessToken = payload.accessToken;
        // set lại user
        state.userLogin = payload;
        state.isFetchingLogin = false;
        // state.accessToken = payload
      })
      .addCase(getUserByAccessTokenThunk.fulfilled, (state, { payload }) => {
        state.userLogin = payload;
      })
      .addCase(UpdateAccountThunk.fulfilled, (state, { payload }) => {
        state.userLogin = payload;
        state.isUpdatingUser = false;
      });
  },
});

export const {
  actions: quanLyNguoiDungActions,
  reducer: quanLyNguoDungReducer,
} = quanLyNguoiDungSlice;
