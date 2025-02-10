import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Loading from "@/components/elements/Loading";
import TextField from "@/components/elements/TextField";

import { categoryFormSchema } from "@/schema/Yup";
import { useUpdateCategory } from "@/services/mutations";
import { cn } from "@/utils/helper";

function UpdateCategoryForm({ stateToggle, categoryData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(categoryFormSchema),
    defaultValues: {
      name: categoryData.name,
      description: categoryData.description,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateCategory();

  const submitHandler = (data) => {
    data._id = categoryData._id;
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        stateToggle(false);
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
          title="نام دسته بندی"
          register={register}
          errors={errors}
          containerCl="text-xs lg:text-sm"
        />
        <TextField
          name="description"
          title="توضیحات (اختیاری)"
          register={register}
          errors={errors}
          containerCl="text-xs lg:text-sm"
        />
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
          disabled={!isDirty || isPending}
          className={cn(
            "flex flex-1 items-center justify-center rounded-lg border border-primary bg-primary px-3 text-xs text-white lg:flex-initial",
            !isDirty && "opacity-50",
          )}
        >
          {isPending ? <Loading /> : "ویرایش"}
        </button>
      </div>
    </form>
  );
}

export default UpdateCategoryForm;
