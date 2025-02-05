import TextField from "@/components/elements/TextField";

function AddUserForm({ stateToggle }) {
  return (
    <form>
      <div className="mb-7 mt-2 flex flex-col gap-4 lg:gap-5">
        <TextField
          name="name"
          title="نام و نام خانوادگی"
          containerCl="text-xs lg:text-sm"
        />
        <TextField
          name="email"
          title="ایمیل (اختیاری)"
          containerCl="text-xs lg:text-sm"
        />
        <TextField
          name="password"
          title="گذرواژه (اختیاری)"
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
        <button className="flex-1 rounded-lg border border-primary bg-primary p-3 text-xs text-white lg:flex-initial">
          افزودن کاربر
        </button>
      </div>
    </form>
  );
}

export default AddUserForm;
