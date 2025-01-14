import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import TextField from "@/components/elements/TextField";

import { useSignup } from "@/services/mutations";
import { signupformSchema } from "@/schema/Yup";

function SignupForm({ setIsLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupformSchema) });

  const { mutate, isPending } = useSignup();

  const submitHandler = (data) => {
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
      <h2 className="text-center font-bold">ثبت نام</h2>
      <div className="mt-8">
        <div className="flex flex-col gap-5">
          <TextField
            name="name"
            title="نام و نام خانوادگی"
            labelCl="text-neutral-700"
            fieldCl="text-sm"
            register={register}
            required={true}
            errors={errors}
          />
          <TextField
            name="email"
            title="ایمیل"
            labelCl="text-neutral-700"
            fieldCl="text-sm"
            register={register}
            required={true}
            errors={errors}
          />
          <TextField
            name="password"
            title="گذرواژه"
            type="password"
            labelCl="text-neutral-700"
            fieldCl="text-sm"
            register={register}
            required={true}
            errors={errors}
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="mt-8 flex w-full items-center justify-center rounded-md bg-primary py-3 text-white"
        >
          ثبت نام
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
