// import axios from 'axios'
import { apiInstance } from "constant/apiInstance";
import { LoginSchematype, RegisterSchemaType } from "schema";
import { UserLogin } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API,
});

export const quanLyNguoiDungServices = {
  register: (data: RegisterSchemaType) => api.post("/DangKy", data),
  login: (data: LoginSchematype) =>
    api.post<ApiResponse<UserLogin>>("/DangNhap", data),
};
