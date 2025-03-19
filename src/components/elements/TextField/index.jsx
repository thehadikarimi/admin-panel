import { useState } from "react";

import SVGIcon from "../SVGIcon";

import { cn } from "@/utils/helper";

function TextField({
  component,
  name,
  title,
  type = "text",
  register,
  errors,
  containerCl = "",
}) {
  const fieldClassName =
    "peer w-full border-none bg-transparent px-3 py-4 text-black outline-none transition-colors duration-300 dark:text-neutral-500";
  const labelClassName =
    "pointer-events-none absolute right-3 top-0 h-fit -translate-y-2 text-[.8em] text-neutral-700 transition-all peer-placeholder-shown:translate-y-4 peer-placeholder-shown:text-[1em] peer-focus:-translate-y-2 peer-focus:text-[.8em] lg:-translate-y-3 lg:peer-focus:-translate-y-3";

  const textFieldChildren = () => {
    if (component === "textarea") {
      return (
        <>
          <textarea
            placeholder=""
            className={cn("min-h-32", fieldClassName)}
            {...(register ? register(name) : {})}
          />
          <label className={labelClassName}>{title}</label>
        </>
      );
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
              autoComplete="off"
              className={cn("pl-10", fieldClassName)}
              {...(register ? register(name) : {})}
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
              autoComplete="off"
              className={fieldClassName}
              {...(register ? register(name) : {})}
            />
            <label className={labelClassName}>{title}</label>
          </>
        );
      }
    }
  };

  return (
    <div className="flex-grow">
      <div className={cn("relative flex text-sm lg:text-base", containerCl)}>
        {textFieldChildren()}
        <fieldset className="pointer-events-none absolute inset-[-5px_0px_0px] overflow-hidden rounded-lg border border-neutral-500 px-2 transition-all duration-300 peer-placeholder-shown:*:max-w-0 peer-placeholder-shown:*:duration-75 peer-focus:*:max-w-full dark:border-neutral-900">
          <legend className="invisible float-none block w-auto max-w-full overflow-hidden whitespace-nowrap text-[.8em] leading-3 transition-[max-width]">
            <span className="visible inline-block px-1 opacity-0">{title}</span>
          </legend>
        </fieldset>
      </div>
      {errors && errors[name] && (
        <span className="mt-1 inline-block text-[.8em] text-error">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default TextField;
