import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Loading from "@/components/elements/Loading";
import TextField from "@/components/elements/TextField";
import FileInput from "@/components/elements/FileInput";

import { addTicketFormSchema } from "@/schema/Yup";
import { useAddNewTicket } from "@/services/mutations";

function AddTicketForm({ userId, stateToggle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addTicketFormSchema) });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddNewTicket();

  const submtiHandler = (data) => {
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("title", data.title);
    formData.append("message", data.message);
    if (data.image[0]) {
      const image = new File(
        [data.image[0]],
        `${userId}_${Date.now()}.${data.image[0].name.split(".").pop()}`,
      );
      formData.append("image", image);
    }

    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries({ queryKey: ["user-tickets", userId] });
        stateToggle(false);
      },
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(submtiHandler)}>
        <div className="mb-7 grid grid-cols-1 gap-4 lg:gap-5">
          <TextField
            name="title"
            title="عنوان"
            register={register}
            errors={errors}
          />
          <TextField
            component="textarea"
            name="message"
            title="توضیحات"
            register={register}
            errors={errors}
          />
          <FileInput name="image" register={register} errors={errors} />
        </div>
        <div className="flex w-full justify-end">
          <button
            disabled={isPending}
            className="flex items-center justify-center rounded-lg border border-primary bg-primary px-3 py-2 text-sm leading-6 text-white lg:text-base"
          >
            {isPending ? <Loading /> : "ارسال تیکت"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTicketForm;
