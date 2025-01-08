import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "@/components/elements/TextField";

function LoginForm() {
  const formSchema = object({
    email: string()
      .required("لطفا ایمیل خود را وارد نمایید")
      .email("لطفا ایمیل معتبر وارد نمایید"),
    password: string()
      .required("لطفا گذرواژه خود را وارد نمایید")
      .min(6, "حداقل باید 6 کاراکتر وارد نمایید")
      .max(32, "حداکثر باید 32 کاراکتر وارد نمایید"),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2 className="text-center font-bold">ورود به حساب</h2>
      <div className="mt-8">
        <div className="flex flex-col gap-5">
          <TextField
            name="email"
            title="ایمیل"
            labelCl="text-neutral-700"
            register={register}
            required={true}
            errors={errors}
          />
          <TextField
            name="password"
            title="گذرواژه"
            type="password"
            labelCl="text-neutral-700"
            register={register}
            required={true}
            errors={errors}
          />
        </div>
        <button
          type="submit"
          className="mt-8 flex w-full items-center justify-center rounded-md bg-primary py-3 text-white"
        >
          ورود
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
