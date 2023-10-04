import { apiInstance } from "constant/apiInstance";
import { Movie, MovieDetail } from "types";
import { Banners } from "types/banners";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_PHIM_API,
});

export const quanLyPhimServices = {
  getMovieList: (query = "") =>
    api.get<ApiResponse<Movie[]>>(`/LayDanhSachPhim${query}`),

  getMovieDetail: (query = "") =>
    api.get<ApiResponse<MovieDetail>>(`/LayThongTinPhim?${query}`),
};

// export const quanLyPhimUpcoming = {
//   getMovieList: (query = "") =>
//     api.get<ApiResponse<Movie[]>>(`/LayDanhSachPhim${query}`),

//   getMovieDetail: (query = "") =>
//     api.get<ApiResponse<MovieDetail>>(`/LayThongTinPhim?${query}`),
// };

export const bannerServices = {
  getBanners: () => api.get<ApiResponse<Banners[]>>(`/LayDanhSachBanner`),
};
// query truyền thì nó lấy, ko thì nó lấy cái chuỗi rỗng thôi
