import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import TextField from "@/components/elements/TextField";
import Loading from "@/components/elements/Loading";

import { useLogin } from "@/services/mutations";
import { loginformSchema } from "@/schema/Yup";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginformSchema) });

  const { mutate, isPending } = useLogin();
  const router = useRouter();

  const submitHandler = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data.status === 200) {
          toast.success("با موفقیت وارد حساب کاربری خود شدید.");
          router.refresh();
        } else {
          toast.error(data.error || "خطا در برقراری ارتباط");
        }
      },
      onError: (error) => {
        toast.error("خطا در برقراری ارتباط");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2 className="text-center font-bold">ورود به داشبورد نکست</h2>
      <div className="mt-8">
        <div className="flex flex-col gap-5">
          <TextField
            name="email"
            title="ایمیل"
            register={register}
            required={true}
            errors={errors}
          />
          <TextField
            name="password"
            title="گذرواژه"
            type="password"
            register={register}
            required={true}
            errors={errors}
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary py-4 text-sm text-white lg:text-base"
        >
          {isPending ? <Loading className="fill-neutral-100" /> : "ورود"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
