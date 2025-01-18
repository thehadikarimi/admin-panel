"use client";

import SVGIcon from "@/components/elements/SVGIcon";
import Image from "next/image";
import { useState } from "react";

function AdminLayout({ children }) {
  const [collapse, setCollapse] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`absolute right-0 top-0 h-full w-64 bg-white px-5 shadow-md dark:bg-dark-500 ${collapse ? "lg:w-20" : "lg:w-64"} transition-all duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full shadow-none"}`}
      >
        <div className="relative flex h-20 items-center border-b border-neutral-500">
          <button
            onClick={() => setCollapse(!collapse)}
            className="absolute right-full mr-2 hidden lg:block"
          >
            <SVGIcon
              name={collapse ? "chevronLeft" : "chevronRight"}
              className="size-6 rounded-full bg-white shadow-md dark:bg-dark-500 dark:fill-neutral-100"
            />
          </button>
          <div className="flex w-full items-center justify-between gap-4">
            <Image
              className="size-10 dark:invert"
              src="/nextjs.svg"
              alt="Next.js logo"
              width={40}
              height={40}
            />
            <div
              className={`transition-opacity ${collapse ? "invisible opacity-0 duration-0" : "delay-300 duration-300"}`}
            >
              <h1 className="font-bold">
                داشبورد <span className="text-primary">نکست</span>
              </h1>
            </div>
          </div>
        </div>
        <div></div>
      </aside>
      <div className="flex-grow px-5">
        <header>Header</header>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
