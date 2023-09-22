import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginSchematype } from "schema";
import { quanLyNguoiDungServices } from "services";
import { sleep } from "utils";

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
