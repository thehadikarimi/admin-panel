import { useState } from "react";

import SVGIcon from "../SVGIcon";

import { cn } from "@/utils/helper";

function TextField({
  component,
  name,
  title,
  type = "text",
  register,
  required = false,
  errors,
  containerCl = "",
}) {
  const fieldClassName =
    "peer w-full border-none bg-transparent px-3 py-4 outline-none";
  const labelClassName =
    "pointer-events-none absolute bottom-full right-3 top-0 my-auto h-fit text-[.8em] text-neutral-700 transition-all peer-placeholder-shown:bottom-0 peer-placeholder-shown:text-[1em] peer-focus:bottom-full peer-focus:text-[.8em]";

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
              autoComplete="off"
              className={"pl-10 " + fieldClassName}
              {...(register ? register(name, { required }) : {})}
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
              {...(register ? register(name, { required }) : {})}
            />
            <label className={labelClassName}>{title}</label>
          </>
        );
      }
    }
  };

  return (
    <div className="flex-grow">
      <div className={cn("relative text-sm lg:text-base", containerCl)}>
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
