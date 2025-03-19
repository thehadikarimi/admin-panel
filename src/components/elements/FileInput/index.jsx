function FileInput({ name, register, errors }) {
  return (
    <div className="flex-grow">
      <div>
        <input
          className="bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 block w-full cursor-pointer rounded-lg border border-neutral-500 text-sm text-black outline-none transition-colors duration-300 file:ml-4 file:border-none file:bg-neutral-500 file:px-4 file:py-3 file:text-black lg:text-base dark:border-neutral-900 dark:text-neutral-500 dark:file:bg-neutral-900 dark:file:text-neutral-500"
          type="file"
          accept="image/png, image/jpeg"
          {...(register ? register(name) : {})}
        />
      </div>
      {errors && errors[name] && (
        <span className="mt-1 inline-block text-[.8em] text-error">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default FileInput;
