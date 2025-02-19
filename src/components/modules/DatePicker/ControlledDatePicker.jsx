import { Controller } from "react-hook-form";
import { DatePicker } from "zaman";

function ControlledDatePicker({ control, name, title, defaultValue }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div className="flex-grow">
          <div className="relative text-sm lg:text-base">
            <DatePicker
              className="z-10 !rounded-lg !border-neutral-500 !bg-white text-sm lg:text-base dark:!border-neutral-700 dark:!bg-dark-500 dark:[&_button[aria-current=date]]:text-neutral-500 dark:[&_button_div]:text-neutral-500"
              inputClass="peer w-full border-none bg-transparent px-3 py-4 text-dark-700 outline-none dark:text-neutral-500"
              inputAttributes={{ placeholder: "" }}
              accentColor="#5750f1"
              defaultValue={defaultValue}
              onChange={(e) => onChange(new Date(e.value).toISOString())}
            />
            <label className="pointer-events-none absolute bottom-full right-3 top-0 my-auto h-fit text-[.8em] text-neutral-700 transition-all peer-placeholder-shown:bottom-0 peer-placeholder-shown:text-[1em] peer-focus:bottom-full peer-focus:text-[.8em]">
              {title}
            </label>
            <fieldset className="pointer-events-none absolute inset-[-5px_0px_0px] overflow-hidden rounded-lg border border-neutral-500 px-2 transition-all duration-300 peer-placeholder-shown:*:max-w-0 peer-placeholder-shown:*:duration-75 peer-focus:*:max-w-full dark:border-neutral-900">
              <legend className="invisible float-none block w-auto max-w-full overflow-hidden whitespace-nowrap text-[.8em] leading-3 transition-[max-width]">
                <span className="visible inline-block px-1 opacity-0">
                  {title}
                </span>
              </legend>
            </fieldset>
          </div>
        </div>
      )}
    />
  );
}

export default ControlledDatePicker;
