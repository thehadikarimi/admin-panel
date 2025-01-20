"use client";

import Sidebar from "@/components/modules/Sidebar";
import MobileHeader from "./Header/MobileHeader";
import DesktopHeader from "./Header/DesktopHeader";

import useMediaQuery from "@/hooks/useMediaQuery";
import useToggle from "@/hooks/useToggle";

function AdminLayout({ children }) {
  const isMobile = useMediaQuery("(max-width: 1023.98px)");
  const [sidebarOpen, sidebarToggle] = useToggle();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} sidebarToggle={sidebarToggle} />
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <header className="sticky top-0 z-[1] w-full border-b border-white bg-white px-3 shadow-md transition-colors duration-300 lg:h-20 lg:px-5 dark:border-neutral-700 dark:bg-dark-500">
          {isMobile ? (
            <MobileHeader sidebarToggle={sidebarToggle} />
          ) : (
            <DesktopHeader />
          )}
        </header>
        <main>
          <div className="container max-w-screen-2xl lg:px-5">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
