import { apiInstance } from "constant/apiInstance";
import { MoviePosts } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_RAP_API,
});

export const quanLyRapServices = {
  getPosts: (query = "") =>
    api.get<ApiResponse<MoviePosts>>(`/LayThongTinLichChieuPhim?${query}`),
};
