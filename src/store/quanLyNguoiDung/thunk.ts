import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginSchematype } from "schema";
import { quanLyNguoiDungServices } from "services";
import { UpdateUser } from "types";
import { getAccessToken, sleep } from "utils";

export const loginThunk = createAsyncThunk(
  "quanLyNguoiDung/login",
  // quanlynd là cái name, cái / t2 là login
  async (payload: LoginSchematype, { rejectWithValue }) => {
    try {
      const data = await quanLyNguoiDungServices.login(payload);

      await sleep(2000);

      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUserByAccessTokenThunk = createAsyncThunk(
  "quanLyNguoiDung/getUserByAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      //lấy token dưới localStorage
      const token = getAccessToken();

      // nếu user đã đăng nhập => có token => get được user qua cái token
      if (token) {
        const data = await quanLyNguoiDungServices.getUserByAccessToken();
        return data.data.content;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const UpdateAccountThunk = createAsyncThunk(
  "UpdateAccountThunk",
  async (payload: UpdateUser, { rejectWithValue }) => {
    try {
      const data = await quanLyNguoiDungServices.updateAccount(payload);
      await sleep(1000);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
