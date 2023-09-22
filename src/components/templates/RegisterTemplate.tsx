import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "components";
import { PATH } from "constant";
// import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { quanLyNguoiDungServices } from "services";
import { handleError } from "utils";

export const RegisterTemplate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  // const {errors} = formState (c2)
  console.log("errors:", errors);

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
    console.log({ values });

    try {
      await quanLyNguoiDungServices.register(values);
      toast.success("Đăng ký thành công!");
      navigate(PATH.login);
    } catch (err) {
      handleError(err);
    }
  };
  // submithandler từ react-hook-form
  return (
    <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-600 text-30">Đăng ký</h2>
      <Input
        className="mt-16"
        label="Tài khoản"
        placeholder="Tài khoản"
        id="taiKhoan"
        name="taiKhoan"
        error={errors?.taiKhoan?.message}
        register={register}
      />
      <Input
        className="mt-16"
        label="Mật khẩu"
        placeholder="Mật khẩu"
        id="matKhau"
        name="matKhau"
        error={errors?.matKhau?.message}
        register={register}
      />
      <Input
        className="mt-16"
        label="Họ tên"
        placeholder="Họ tên"
        id="hoTen"
        name="hoTen"
        error={errors?.hoTen?.message}
        register={register}
      />

      <Input
        className="mt-16"
        label="Email"
        placeholder="Email"
        id="email"
        name="email"
        error={errors?.email?.message}
        register={register}
      />

      <Input
        className="mt-16"
        label="Số điện thoại"
        placeholder="Số điện thoại"
        id="soDt"
        name="soDt"
        error={errors?.soDt?.message}
        register={register}
      />

      <Input
        className="mt-16"
        label="Mã nhóm"
        placeholder="Mã nhóm"
        id="maNhom"
        name="maNhom"
        error={errors?.maNhom?.message}
        register={register}
      />

      <button className="w-full p-16 bg-red-500 text-white mt-20 rounded-10">
        Đăng ký
      </button>
    </form>
  );
};
