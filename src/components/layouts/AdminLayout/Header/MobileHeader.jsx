import Image from "next/image";

import DarkModeToggle from "@/components/elements/DarkModeToggle";
import Searchbar from "@/components/elements/Searchbar";
import SVGIcon from "@/components/elements/SVGIcon";

function MobileHeader({ sidebarToggle }) {
  return (
    <div className="flex flex-col gap-4 py-3">
      <div className="flex items-center justify-between">
        <button onClick={() => sidebarToggle(true)}>
          <SVGIcon name="menu" className="size-6 dark:fill-neutral-500" />
        </button>
        <div className="flex items-center gap-3">
          <Image
            className="size-10 dark:invert"
            src="/nextjs.svg"
            alt="Next.js logo"
            width={40}
            height={40}
          />
          <p className="text-nowrap font-bold text-black dark:text-neutral-100">
            داشبورد <span className="text-primary">نکست</span>
          </p>
        </div>
        <button>
          <SVGIcon name="person_0" className="size-6 dark:fill-neutral-500" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Searchbar />
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default MobileHeader;
