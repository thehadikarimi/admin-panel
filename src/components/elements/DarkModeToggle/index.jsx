import SVGIcon from "../SVGIcon";

import useColorMode from "@/hooks/useColorMode";

function DarkModeToggle() {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div
      onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
      className="relative flex cursor-pointer items-center gap-3 rounded-full bg-neutral-500 p-1 transition-colors duration-300 lg:p-1.5 dark:bg-dark-700"
    >
      <div
        className={`absolute z-[1] size-8 lg:size-9 ${colorMode === "dark" ? "-translate-x-0.3" : "-translate-x-11 lg:-translate-x-12"} rounded-full bg-neutral-200 transition-transform duration-300 dark:bg-neutral-900`}
      ></div>
      <span className="relative z-[2] flex size-8 items-center justify-center lg:size-9">
        <SVGIcon name="darkMode" className="size-6 dark:fill-neutral-500" />
      </span>
      <span className="relative z-[2] flex size-8 items-center justify-center lg:size-9">
        <SVGIcon name="lightMode" className="size-6 dark:fill-neutral-500" />
      </span>
    </div>
  );
}

export default DarkModeToggle;
