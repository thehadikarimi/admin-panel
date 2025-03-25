"use client";

import { useRef } from "react";

import Header from "./Header";
import Sidebar from "@/components/modules/Sidebar";
import Footer from "../Footer";

import useToggle from "@/hooks/useToggle";
import useScroll from "@/hooks/useScroll";

function AdminLayout({ children }) {
  const [sidebarOpen, sidebarToggle] = useToggle();
  const scrollEleRef = useRef(null);
  const scroll = useScroll(scrollEleRef);

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} sidebarToggle={sidebarToggle} />
      <div
        ref={scrollEleRef}
        className="flex-grow overflow-y-auto overflow-x-hidden"
      >
        <Header scroll={scroll} sidebarToggle={sidebarToggle} />
        <main className="min-h-[calc(100vh_-_216px)] w-full lg:min-h-[calc(100vh_-_172px)]">
          <div className="container max-w-screen-2xl lg:px-5">
            <div className="py-3 lg:py-5">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
