"use client";

import Sidebar from "@/components/modules/Sidebar";
import { useState } from "react";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-grow px-5">
        <header>Header</header>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
