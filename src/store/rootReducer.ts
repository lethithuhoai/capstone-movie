import { combineReducers } from "@reduxjs/toolkit";
import { quanLyNguoDungReducer } from "./quanLyNguoiDung";

export const rootReducer = combineReducers({
  quanLyNguoiDung: quanLyNguoDungReducer,
});
