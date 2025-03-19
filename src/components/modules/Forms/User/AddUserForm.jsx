import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import TextField from "@/components/elements/TextField";
import Loading from "@/components/elements/Loading";
import ControlledSelectOptions from "@/components/modules/SelectOptions/ControlledSelectOptions";

import { addUserFormSchema } from "@/schema/Yup";
import { useAddUser } from "@/services/mutations";
import { userDefaultPayment } from "@/constant/payment";

function AddUserForm({ stateToggle }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addUserFormSchema) });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddUser();

  const submitHandler = (data) => {
    data.payment = userDefaultPayment;
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        stateToggle(false);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-7 mt-2 flex flex-col gap-4 lg:gap-5">
        <TextField
          name="name"
          title="نام و نام خانوادگی"
          register={register}
          errors={errors}
          containerCl="text-xs lg:text-sm"
        />
        <TextField
          name="phoneNumber"
          title="شماره تلفن (اختیاری)"
          register={register}
          errors={errors}
          containerCl="text-xs lg:text-sm"
        />
        <ControlledSelectOptions
          control={control}
          name="category"
          title="دسته بندی (اختیاری)"
          className="text-xs lg:text-sm"
        />
        <TextField
          name="email"
          title="ایمیل (اختیاری)"
          register={register}
          errors={errors}
          containerCl="text-xs lg:text-sm"
        />
        {watch("email") ? (
          <TextField
            type="password"
            name="password"
            title="گذرواژه"
            register={register}
            errors={errors}
            containerCl="text-xs lg:text-sm"
          />
        ) : null}
      </div>
      <div className="flex w-full justify-end gap-4">
        <button
          onClick={() => stateToggle(false)}
          type="button"
          className="flex-1 rounded-lg border border-primary p-3 text-xs text-primary lg:flex-initial"
        >
          انصراف
        </button>
        <button
          disabled={isPending}
          className="flex flex-1 items-center justify-center rounded-lg border border-primary bg-primary px-3 text-xs text-white lg:flex-initial"
        >
          {isPending ? <Loading /> : "افزودن کاربر"}
        </button>
      </div>
    </form>
  );
}

export default AddUserForm;
