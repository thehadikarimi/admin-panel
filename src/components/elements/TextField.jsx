import { useState } from "react";

function TextField({
  component,
  parentCl,
  fieldCl,
  labelCl,
  messageCl,
  name,
  title,
  type = "text",
  register,
  required = false,
  errors,
}) {
  const textFieldChildren = () => {
    if (component === "select") {
      return "";
    } else if (component === "textarea") {
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
              className="peer w-full border-none outline-none"
              autoComplete="off"
              {...register(name, { required })}
            />
            <label
              className={`pointer-events-none absolute right-3 top-auto -mr-2 -translate-y-full border-x border-[transparent] bg-white px-2 text-[.7em] transition-all duration-300 peer-placeholder-shown:mr-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:px-0 peer-placeholder-shown:text-[.85em] peer-focus:-mr-2 peer-focus:-translate-y-full peer-focus:px-2 peer-focus:text-[.7em] ${labelCl ? labelCl : ""}`}
            >
              {title}
            </label>
            <button
              type="button"
              onClick={handleShowPass}
              className="absolute left-3 text-[.7em]"
            >
              {inputType === "password" ? "نمایش" : "پنهان"}
            </button>
          </>
        );
      } else {
        return (
          <>
            <input
              type={type}
              placeholder=""
              className="peer w-full border-none outline-none"
              autoComplete="off"
              {...register(name, { required })}
            />
            <label
              className={`pointer-events-none absolute right-3 top-auto -mr-2 -translate-y-full border-x border-[transparent] bg-white px-2 text-[.7em] transition-all duration-300 peer-placeholder-shown:mr-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:px-0 peer-placeholder-shown:text-[.85em] peer-focus:-mr-2 peer-focus:-translate-y-full peer-focus:px-2 peer-focus:text-[.7em] ${labelCl ? labelCl : ""}`}
            >
              {title}
            </label>
          </>
        );
      }
    }
  };

  return (
    <div
      className={`flex-grow text-sm md:text-base ${parentCl ? parentCl : ""}`}
    >
      <div
        className={`relative rounded-md border border-neutral-500 px-3 py-3 ${fieldCl ? fieldCl : ""}`}
      >
        {textFieldChildren()}
      </div>
      {errors && errors[name] && (
        <span
          className={`mt-1 inline-block text-[.8em] text-error ${messageCl ? messageCl : ""}`}
        >
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default TextField;
