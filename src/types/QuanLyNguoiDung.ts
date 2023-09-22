export type UserLogin = {
    taiKhoan: string
    hoTen: string
    email: string
    soDT: string
    maNhom: string
    maLoaiNguoiDung: 'KhachHang' | 'QuanTri'
    // là 1 union type, chỉ có 2 giá trị, 1 là khách hàng, 2 là quản trị
    accessToken: string
}