export type UserLogin = {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: "KhachHang" | "QuanTri";
  // là 1 union type, chỉ có 2 giá trị, 1 là khách hàng, 2 là quản trị
  accessToken: string;
};
export type UserByAccessToken = Omit<UserLogin, "accessToken"> & {
  thongTinDatVe?: [];
  loaiNguoiDung: {
    maLoaiNguoiDung: "KhachHang" | "QuanTri";
  };
};
export type UpdateUser = {
  taiKhoan: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
};
export type UpdateUserResponse = UpdateUser & {
  soDT?: string;
  loaiNguoiDung: string;
  thongTinDatVe:
    | {
        maPhim: string;
        rap: string;
        soGhe: string;
        thoiGian: string;
      }[]
    | null;
};
