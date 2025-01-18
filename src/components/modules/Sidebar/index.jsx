import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import SVGIcon from "@/components/elements/SVGIcon";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [collapse, setCollapse] = useState(false);

  const menuItem = [
    { icon: "dashboard", label: "داشبورد", route: "/admin" },
    { icon: "category_0", label: "دسته بندی", route: "/admin/category" },
    { icon: "group", label: "کاربران", route: "/admin/users" },
    { icon: "sms", label: "تیکت ها", route: "/admin/tickets" },
  ];

  return (
    <div>
      <aside
        className={`absolute right-0 top-0 z-10 h-full w-64 bg-white px-5 shadow-md dark:bg-dark-500 ${collapse ? "lg:w-20" : "lg:w-64"} transition-all duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full shadow-none"}`}
      >
        <div className="relative flex h-20 items-center border-b border-neutral-500">
          <button
            onClick={() => setCollapse(!collapse)}
            className="absolute right-full mr-2 hidden rounded-full bg-white shadow-md outline-none lg:block dark:bg-dark-500"
          >
            <SVGIcon
              name={collapse ? "chevronLeft" : "chevronRight"}
              className="size-6 dark:fill-neutral-100"
            />
          </button>
          <div className="flex w-full items-center gap-3 overflow-hidden">
            <Image
              className="size-10 dark:invert"
              src="/nextjs.svg"
              alt="Next.js logo"
              width={40}
              height={40}
            />
            <h1 className="text-nowrap font-bold">
              داشبورد <span className="text-primary">نکست</span>
            </h1>
          </div>
        </div>
        <div className="h-[calc(100%_-_5rem)] py-3">
          <div className="flex h-full flex-col justify-between gap-4 overflow-auto overflow-x-hidden">
            <div>
              <ul>
                {menuItem.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.route}
                      className="group block text-nowrap p-2 *:transition-all *:duration-150"
                    >
                      <SVGIcon
                        name={item.icon}
                        className="inline-block size-6 group-hover:fill-primary dark:fill-neutral-100"
                      />
                      <span className="mr-5 inline-block text-nowrap group-hover:text-primary">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button className="w-full text-nowrap p-2 text-right">
                <SVGIcon
                  name="logout"
                  className="inline-block size-6 fill-error"
                />
                <span className="mr-5 inline-block text-nowrap text-error">
                  خروج از حساب کاربری
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 left-0 top-0 bg-black/30 opacity-0 backdrop-blur-sm transition-all duration-300 lg:hidden ${sidebarOpen ? "visible opacity-100" : "invisible"}`}
      ></div>
    </div>
  );
}

export default Sidebar;
