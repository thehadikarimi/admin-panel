import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import { useModal } from "@/context/ModalProvider";

import SVGIcon from "@/components/elements/SVGIcon";

import useToggle from "@/hooks/useToggle";

function Sidebar({ sidebarOpen, sidebarToggle }) {
  const [collapse, collapseToggle] = useToggle();
  const router = useRouter();

  const { openModal, closeModal } = useModal();

  const menuItem = [
    { icon: "dashboard", label: "داشبورد", route: "/admin" },
    { icon: "category_0", label: "دسته بندی", route: "/admin/category" },
    { icon: "group", label: "کاربران", route: "/admin/users" },
    { icon: "sms", label: "تیکت ها", route: "/admin/tickets" },
  ];

  const signoutHandler = async () => {
    try {
      const data = await signOut({ redirect: false, callbackUrl: "/login" });
      closeModal();
      setTimeout(() => router.push(data.url), 1000);
    } catch (error) {
      toast.error("خطا در برقراری ارتباط");
    }
  };

  const hadnleShowModal = () => {
    openModal({
      headText: "خروج از حساب کاربری",
      bodyText: "آیا می خواهید از حساب کاربری خارج شوید؟",
      buttonText: "خروج از حساب",
      onAcceptHandler: signoutHandler,
    });
  };

  return (
    <div className="z-[2] border-neutral-500 transition-colors duration-300 lg:relative lg:border-l dark:border-neutral-700">
      <aside
        className={`absolute right-0 top-0 z-20 h-full w-64 bg-white px-5 shadow-md dark:bg-dark-500 ${collapse ? "lg:w-20" : "lg:w-64"} transition-all duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full shadow-none"}`}
      >
        <div className="relative flex h-20 items-center border-b border-neutral-500">
          <button
            onClick={collapseToggle}
            className="absolute right-full mr-2 hidden rounded-full border border-neutral-500 bg-white outline-none transition-all duration-300 lg:block dark:border-neutral-900 dark:bg-dark-500"
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
            <h1 className="text-nowrap font-bold text-black dark:text-neutral-100">
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
                      className="group block text-nowrap p-2"
                    >
                      <SVGIcon
                        name={item.icon}
                        className="inline-block size-6 group-hover:fill-primary dark:fill-neutral-100"
                      />
                      <span className="mr-5 inline-block text-nowrap text-black group-hover:text-primary dark:text-neutral-100">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                className="w-full text-nowrap p-2 text-right"
                onClick={hadnleShowModal}
              >
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
        onClick={() => sidebarToggle(false)}
        className={`fixed inset-0 left-0 top-0 z-10 bg-black/30 opacity-0 backdrop-blur-sm transition-all duration-300 lg:hidden ${sidebarOpen ? "visible opacity-100" : "invisible"}`}
      ></div>
    </div>
  );
}

export default Sidebar;
