export type BoxOfficeList = {
    thongTinPhim: {
        maLichChieu: number;
        tenCumRap: string;
        tenRap: string;
        diaChi: string;
        tenPhim: string;
        hinhAnh: string;
        ngayChieu: string;
        gioChieu: string;
    };
    danhSachGhe: {
        maGhe: number;
        tenGhe: string;
        maRap: number;
        loaiGhe: string;
        stt: string;
        giaVe: number;
        daDat: boolean;
        taiKhoanNguoiDat: string | null;
    }[];
};

export type Booking = {
    daDat: boolean;
    giaVe: number;
    loaiGhe: string;
    maGhe: number;
    maRap: number;
    stt: string;
    taiKhoanNguoiDat: string;
    tenGhe: string;
};

export type Booked = {
    maLichChieu: number;
    danhSachVe: {
        maGhe: number;
        giaVe: number;
    }[];
};