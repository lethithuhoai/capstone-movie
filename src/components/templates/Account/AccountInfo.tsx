import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "components/ui";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountSchema, AccountSchemaType } from "schema/AccountSchema";
import { useAppDispatch } from "store";
import { UpdateAccountThunk } from "store/quanLyNguoiDung";
import styled from "styled-components";
import { handleError } from "utils";
// import styled from "styled-components";
import { toast } from "react-toastify";
import { UpdateUser } from "types";

export const AccountInfo = () => {
  const { user } = useAuth();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AccountSchemaType>({
    resolver: zodResolver(AccountSchema),
    mode: "onChange",
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AccountSchemaType> = (value) => {
    console.log("value: ", value);
    const { taiKhoan, email, soDt, maNhom, hoTen } = value;
    const updateData: UpdateUser = {
      taiKhoan,
      email,
      soDt,
      maNhom,
      maLoaiNguoiDung: "KhachHang",
      hoTen,
    };
    // gọi api update tài khoản

    // dispatch action getUserByAccessToken
    dispatch(UpdateAccountThunk(updateData))
      .unwrap()
      .then(() => toast.success("Cập nhật thành công!"))
      .catch((err) => {
        return handleError(err);
      });
    // lưu ý sau khi update tài khoản xong các bạn phải dispatch action update lại thông tin tk
    // làm tiếp
  };

  useEffect(() => {
    reset({
      ...user,
      soDt: user?.soDT,
    });
  }, [user, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-20 font-600">Thông tin tài khoản</p>
      <Inputs
        className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]: text-black"
        label="Tài khoản"
        name="taiKhoan"
        error={errors?.taiKhoan?.message}
        register={register}
      />
      <Inputs
        className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
        label="Họ và tên"
        name="hoTen"
        error={errors?.hoTen?.message}
        register={register}
      />
      <Inputs
        className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
        label="Email"
        name="email"
        error={errors?.email?.message}
        register={register}
      />
      <Inputs
        className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
        label="Số điện thoại"
        name="soDt"
        error={errors?.soDt?.message}
        register={register}
      />
      <Inputs
        className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
        label="Mã nhóm"
        name="maNhom"
        error={errors?.maNhom?.message}
        register={register}
      />
      <Inputs
        className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
        label="Mã loại người dùng"
        name="maLoaiNguoiDung"
        error={errors?.maLoaiNguoiDung?.message}
        register={register}
      />

      <div className="text-right mt-20">
        <Button htmlType="submit" type="primary" className="!h-[46px]">
          Hoàn thành chỉnh sửa
        </Button>
      </div>
    </form>
  );
};

const Inputs = styled(Input)`
  input {
    color: #111;
  }
`;
