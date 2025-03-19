import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Loading from "@/components/elements/Loading";
import TextField from "@/components/elements/TextField";
import FileInput from "@/components/elements/FileInput";

import { addTicketFormSchema } from "@/schema/Yup";

function AddTicketForm({ userId, stateToggle }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addTicketFormSchema) });

  const isPending = false;

  const submtiHandler = (data) => {
    const formData = new FormData();

    data.userId = userId;
    for (let item in data) {
      formData.append(item, data[item]);
    }

    console.log(formData);
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
