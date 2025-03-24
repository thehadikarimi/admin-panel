import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import TextField from "@/components/elements/TextField";
import Loading from "@/components/elements/Loading";

import { useSignup } from "@/services/mutations";
import { signupformSchema } from "@/schema/Yup";
import { userDefaultPayment } from "@/constant/payment";

function SignupForm({ setIsLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupformSchema) });

  const { mutate, isPending } = useSignup();

  const submitHandler = (data) => {
    data.payments = userDefaultPayment;
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        setIsLogin(true);
      },
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2 className="text-center font-bold text-black dark:text-neutral-100">
        ثبت نام در داشبورد نکست
      </h2>
      <div className="mt-8">
        <div className="flex flex-col gap-5">
          <TextField
            name="name"
            title="نام و نام خانوادگی"
            register={register}
            errors={errors}
          />
          <TextField
            name="email"
            title="ایمیل"
            register={register}
            errors={errors}
          />
          <TextField
            name="password"
            title="گذرواژه"
            type="password"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary py-3.5 text-sm leading-6 text-white lg:py-4 lg:text-base"
        >
          {isPending ? <Loading className="fill-neutral-500" /> : "ثبت نام"}
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
