import { useState } from "react";

import SVGIcon from "./SVGIcon";

function TextField({
  component,
  fieldCl = "",
  labelCl = "",
  messageCl = "",
  name,
  title,
  type = "text",
  register,
  required = false,
  errors,
}) {
  const fieldClassName = `peer w-full border-none bg-[transparent] outline-none ${fieldCl}`;
  const labelClassName = `pointer-events-none absolute right-3 top-auto -translate-y-full border-x border-[transparent] text-[.7em] transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[.85em] peer-focus:-translate-y-full peer-focus:text-[.7em] ${labelCl}`;

  const textFieldChildren = () => {
    if (component === "textarea") {
      return "";
    } else {
      if (type === "password") {
        const [inputType, setInputType] = useState(type);

        const handleShowPass = () => {
          if (inputType === "password") {
            setInputType("text");
          } else {
            setInputType("password");
          }
        };

        return (
          <>
            <input
              type={inputType}
              placeholder=""
              className={"pl-7 " + fieldClassName}
              {...register(name, { required })}
            />
            <label className={labelClassName}>{title}</label>
            <button
              type="button"
              onClick={handleShowPass}
              className="absolute bottom-0 left-3 top-0 text-[.7em]"
            >
              {inputType === "password" ? (
                <SVGIcon
                  name="visibilityOn"
                  className="size-4 md:size-5 dark:fill-neutral-100"
                />
              ) : (
                <SVGIcon
                  name="visibilityOff"
                  className="size-4 md:size-5 dark:fill-neutral-100"
                />
              )}
            </button>
          </>
        );
      } else {
        return (
          <>
            <input
              type={type}
              placeholder=""
              className={fieldClassName}
              {...register(name, { required })}
            />
            <label className={labelClassName}>{title}</label>
          </>
        );
      }
    }
  };

  return (
    <div className="flex-grow text-sm md:text-base">
      <div className="relative p-3">
        {textFieldChildren()}
        <fieldset className="pointer-events-none absolute inset-[-10px_0px_0px] overflow-hidden rounded-md border border-neutral-500 px-2 peer-placeholder-shown:*:max-w-0 peer-placeholder-shown:*:duration-75 peer-focus:*:max-w-full">
          <legend className="invisible float-none block w-auto max-w-full overflow-hidden whitespace-nowrap text-[.7em] transition-[max-width]">
            <span className="visible inline-block px-1 opacity-0">{title}</span>
          </legend>
        </fieldset>
      </div>
      {errors && errors[name] && (
        <span
          className={`mt-1 inline-block text-[.8em] text-error ${messageCl}`}
        >
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default TextField;
