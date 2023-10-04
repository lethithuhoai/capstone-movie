import { apiInstance } from "constant/apiInstance";
import { Booked, BoxOfficeList } from "types/QuanLyDatVe";

const api = apiInstance({
   baseURL: import.meta.env.VITE_QUAN_LY_DAT_VE_API,
})
export const quanLyDatVeServices = {
   movieBooking : (query= '46998') => api.get<ApiResponse<BoxOfficeList>>(`/LayDanhSachPhongVe${query}`),

   postBooked : (value : Booked) => api.post<ApiResponse<string>>("/DatVe",value)
}