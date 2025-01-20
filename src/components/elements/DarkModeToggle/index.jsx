import SVGIcon from "../SVGIcon";

import useDOMReady from "@/hooks/useDOMReady";
import useColorMode from "@/hooks/useColorMode";

function DarkModeToggle() {
  const DOMReady = useDOMReady();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div
      onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
      className="relative flex cursor-pointer items-center gap-3 rounded-full bg-neutral-500 p-1 transition-colors duration-300 dark:bg-dark-700"
    >
      <div
        className={`absolute z-[1] size-8 ${DOMReady && colorMode === "dark" ? "-translate-x-0.3" : "-translate-x-11"} rounded-full bg-neutral-200 transition-transform duration-300 dark:bg-neutral-900`}
      ></div>
      <span className="relative z-[2] flex size-8 items-center justify-center">
        <SVGIcon
          name="darkMode"
          className="size-6 lg:size-8 dark:fill-neutral-500"
        />
      </span>
      <span className="relative z-[2] flex size-8 items-center justify-center">
        <SVGIcon
          name="lightMode"
          className="size-6 lg:size-8 dark:fill-neutral-500"
        />
      </span>
    </div>
  );
}

export default DarkModeToggle;
