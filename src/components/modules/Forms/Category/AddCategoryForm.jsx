"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import TextField from "@/components/elements/TextField";
import Loading from "@/components/elements/Loading";

import { categoryFormSchema } from "@/schema/Yup";
import { useAddCategory } from "@/services/mutations";

function AddCategoryForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categoryFormSchema) });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddCategory();

  const submtiHandler = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        reset();
      },
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(submtiHandler)}>
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          <TextField
            name="name"
            title="نام دسته بندی"
            register={register}
            errors={errors}
          />
          <TextField
            name="description"
            title="توضیحات (اختیاری)"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex w-full justify-end">
          <button
            disabled={isPending}
            className="flex items-center justify-center rounded-lg border border-primary bg-primary px-3 py-2 text-sm leading-6 text-white lg:text-base"
          >
            {isPending ? <Loading /> : "افزودن دسته بندی"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryForm;
