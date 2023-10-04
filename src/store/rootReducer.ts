import { combineReducers } from "@reduxjs/toolkit";
import { quanLyNguoDungReducer } from "./quanLyNguoiDung";
import { quanLyPhimReducer } from "./quanLyPhim";
import { quanLyBannersReducer } from "./quanLyBanner";
import { quanLyDatVeReducer } from "./quanLyDatVe";

export const rootReducer = combineReducers({
  quanLyNguoiDung: quanLyNguoDungReducer,
  quanLyPhim: quanLyPhimReducer,
  quanLyBanner: quanLyBannersReducer,
  quanLyDatVe : quanLyDatVeReducer,
});
