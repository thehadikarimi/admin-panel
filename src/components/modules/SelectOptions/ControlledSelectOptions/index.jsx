import { Controller } from "react-hook-form";
import Select from "react-select";

import { useGetCategories } from "@/services/queries";

import { cn } from "@/utils/helper";

import "./ControlledSelectOptions.css";

function ControlledSelectOptions({ control, name, title, defaultValue, className }) {
  const { data, isPending } = useGetCategories();
  const options = data?.data.categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const customStyles = {
    control: (styles) => ({
      ...styles,
      boxShadow: "none",
    }),
    menuList: (styles) => ({
      ...styles,
      padding: "0",
    }),
    option: (styles) => ({
      ...styles,
      cursor: "pointer",
    }),
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div className="flex-grow">
          <div className={cn("relative text-sm lg:text-base", className)}>
            {isPending ? (
              <input className="w-full border-none bg-transparent px-3 py-4 outline-none" />
            ) : (
              <Select
                className="*:!border-none *:!bg-white *:!text-black *:!outline-none *:!transition-colors *:!duration-300 dark:*:!bg-dark-500 dark:*:!text-neutral-500"
                classNamePrefix="controlled-select-options"
                placeholder="انتخاب کنید"
                defaultValue={options?.find(
                  (option) => option.label === defaultValue,
                )}
                options={options}
                noOptionsMessage={() => "موردی یافت نشد."}
                onChange={(e) => onChange(e.label)}
                styles={customStyles}
              />
            )}

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

export default ControlledSelectOptions;
