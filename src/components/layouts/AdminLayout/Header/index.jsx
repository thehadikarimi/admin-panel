import Image from "next/image";
import { useEffect } from "react";

import SVGIcon from "@/components/elements/SVGIcon";
import Searchbar from "@/components/elements/Searchbar";
import DarkModeToggle from "@/components/elements/DarkModeToggle";
import ProfileDropdown from "@/components/modules/ProfileDropdown";

import useMediaQuery from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";

function Header({ scroll, sidebarToggle }) {
  const isMobile = useMediaQuery("(max-width: 1023.98px)");
  const [collapse, collapseToggle] = useToggle(false);

  useEffect(() => {
    if (scroll > 119) collapseToggle(true);

    if (scroll < 39) collapseToggle(false);
  }, [scroll]);

  return (
    <header
      className={`sticky top-0 z-[1] ${isMobile && collapse ? "h-[4.5rem]" : "h-32"} w-full border-b border-white bg-white px-3 shadow-md transition-all duration-300 lg:h-20 lg:px-5 dark:border-neutral-700 dark:bg-dark-500`}
    >
      <div className="flex flex-col gap-4 py-4 lg:flex-row-reverse lg:items-center lg:justify-between">
        <div className="relative z-[2] flex items-center justify-between bg-white transition-colors duration-300 dark:bg-dark-500">
          <button onClick={() => sidebarToggle(true)} className="lg:hidden">
            <SVGIcon name="menu" className="size-6 dark:fill-neutral-500" />
          </button>
          <div className="flex items-center gap-3 lg:hidden">
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
          <ProfileDropdown />
        </div>
        <div
          className={`flex ${isMobile && collapse ? "-translate-y-14" : "translate-y-0"} items-center justify-between gap-2 transition-transform duration-[330ms] lg:flex-grow lg:gap-8`}
        >
          <Searchbar />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
