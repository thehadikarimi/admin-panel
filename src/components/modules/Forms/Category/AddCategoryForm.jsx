"use client";

import TextField from "@/components/elements/TextField";

function AddCategoryForm() {
  return (
    <div className="mt-5">
      <form>
        <div className="mb-7 flex flex-col gap-4 sm:flex-row lg:gap-5">
          <TextField name="name" title="نام دسته بندی" />
          <TextField name="slug" title="اسلاگ دسته بندی" />
        </div>
        <div className="flex w-full justify-end">
          <button className="flex items-center justify-center rounded-lg border border-primary bg-primary px-3 py-2 text-sm leading-6 text-white lg:text-base">
            افزودن دسته بندی
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryForm;
