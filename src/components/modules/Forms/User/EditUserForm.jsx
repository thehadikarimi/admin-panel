import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import TextField from "@/components/elements/TextField";
import ControlledDatePicker from "@/components/modules/DatePicker/ControlledDatePicker";
import ControlledSelectOptions from "@/components/modules/SelectOptions/ControlledSelectOptions";
import Loading from "@/components/elements/Loading";

import { editUserFormSchema } from "@/schema/Yup";
import { useUpdateUser } from "@/services/mutations";
import { cn } from "@/utils/helper";

function EditUserForm({ userData, enableCategoryEditing = true }) {
  const { _id, name, email, phoneNumber, birthDate, category } = userData;

  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(editUserFormSchema),
    defaultValues: {
      name,
      email,
      phoneNumber,
      birthDate,
      category,
    },
  });
  const isDirty = Object.keys(dirtyFields).length;

  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateUser(_id);

  const submitHandler = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["user", _id] });
        router.push(pathname);
      },
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  return (
    <>
      <h2 className="title">ویرایش اطلاعات کاربر</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-6 flex flex-col gap-7"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <TextField
            name="name"
            title="نام و نام خانوادگی"
            register={register}
            errors={errors}
          />
          <TextField
            name="phoneNumber"
            title="شماره موبایل"
            register={register}
            errors={errors}
          />
          <TextField
            name="email"
            title="ایمیل"
            register={register}
            errors={errors}
          />
          {!email ? (
            <TextField
              name="password"
              title="گذرواژه"
              type="password"
              register={register}
              errors={errors}
              required={true}
            />
          ) : null}
          <ControlledDatePicker
            control={control}
            name="birthDate"
            title="تاریخ تولد"
            defaultValue={birthDate}
          />
          {enableCategoryEditing ? (
            <ControlledSelectOptions
              control={control}
              name="category"
              title="دسته بندی"
              defaultValue={category}
            />
          ) : null}
        </div>
        <div className="flex w-full justify-end gap-5">
          <button
            onClick={() => router.push(pathname)}
            type="button"
            className="flex-1 rounded-lg border border-primary p-3 text-sm text-primary lg:flex-initial lg:text-base"
          >
            انصراف
          </button>
          <button
            disabled={!isDirty || isPending}
            className={cn(
              "flex flex-1 items-center justify-center rounded-lg border border-primary bg-primary px-3 text-sm text-white lg:flex-initial lg:text-base",
              !isDirty && "opacity-50",
            )}
          >
            {isPending ? <Loading /> : "ویرایش"}
          </button>
        </div>
      </form>
    </>
  );
}

export default EditUserForm;
