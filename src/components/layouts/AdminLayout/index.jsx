"use client";

import { useRef } from "react";

import Header from "./Header";
import Sidebar from "@/components/modules/Sidebar";

import useToggle from "@/hooks/useToggle";
import useScroll from "@/hooks/useScroll";

function AdminLayout({ children }) {
  const [sidebarOpen, sidebarToggle] = useToggle();
  const scrollEleRef = useRef(null);
  const scroll = useScroll(scrollEleRef);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} sidebarToggle={sidebarToggle} />
      <div
        ref={scrollEleRef}
        className="flex-grow overflow-y-auto overflow-x-hidden"
      >
        <Header scroll={scroll} sidebarToggle={sidebarToggle} />
        <main>
          <div className="container max-w-screen-2xl lg:px-5">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
