import SVGIcon from "../SVGIcon";
import Skeleton from "../Skeleton";

import useDOMReady from "@/hooks/useDOMReady";
import useColorMode from "@/hooks/useColorMode";
import { cn } from "@/utils/helper";

function DarkModeToggle() {
  const DOMReady = useDOMReady();
  const [colorMode, setColorMode] = useColorMode();

  if (!DOMReady) {
    return <Skeleton className="h-10 w-[84px] rounded-full lg:h-12 lg:w-24" />;
  }

  return (
    <div
      onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
      className="relative flex cursor-pointer items-center gap-3 rounded-full bg-neutral-500 p-1 lg:p-1.5 dark:bg-dark-700"
    >
      <div
        className={cn(
          "absolute z-[1] size-8 rounded-full bg-neutral-200 transition-transform duration-300 lg:size-9 dark:bg-neutral-900",
          colorMode === "dark"
            ? "-translate-x-0.3"
            : "-translate-x-11 lg:-translate-x-12",
        )}
      ></div>
      <span className="relative z-[2] flex size-8 items-center justify-center lg:size-9">
        <SVGIcon name="darkMode" className="size-6" />
      </span>
      <span className="relative z-[2] flex size-8 items-center justify-center lg:size-9">
        <SVGIcon name="lightMode" className="size-6" />
      </span>
    </div>
  );
}

export default DarkModeToggle;
