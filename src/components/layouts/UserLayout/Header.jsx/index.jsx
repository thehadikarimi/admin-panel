"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import SVGIcon from "@/components/elements/SVGIcon";
import DarkModeToggle from "@/components/elements/DarkModeToggle";
import ProfileDropdown from "@/components/modules/ProfileDropdown";

import useToggle from "@/hooks/useToggle";
import { useModal } from "@/context/ModalProvider";
import { cn } from "@/utils/helper";

function Header() {
  const router = useRouter();
  const [sidebarOpen, sidebarToggle] = useToggle();
  const { openModal, closeModal } = useModal();

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
    <header className="h-20 w-full border-b border-white bg-white px-3 shadow-md transition-all duration-300 lg:px-5 dark:border-neutral-700 dark:bg-dark-500">
      <div>
        <aside
          className={cn(
            "absolute right-0 top-0 z-20 h-full w-64 bg-white px-5 shadow-md transition-all duration-300 dark:bg-dark-500",
            sidebarOpen ? "translate-x-0" : "translate-x-full shadow-none",
          )}
        >
          <div className="relative flex h-20 items-center border-b border-neutral-500">
            <div className="w-full overflow-hidden">
              <Link href="/admin" className="flex items-center gap-3">
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
              </Link>
            </div>
          </div>
          <div className="h-[calc(100%_-_5rem)] py-3">
            <div className="flex h-full flex-col justify-between gap-4 overflow-auto overflow-x-hidden">
              <div>
                <ul>
                  <li>
                    <Link
                      href="/profile"
                      className="group block text-nowrap p-2"
                    >
                      <SVGIcon
                        name="dashboard"
                        className="inline-block size-6 group-hover:fill-primary dark:fill-neutral-100"
                      />
                      <span className="mr-5 inline-block text-nowrap text-black group-hover:text-primary dark:text-neutral-100">
                        صفحه اصلی
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile/tickets"
                      className="group block text-nowrap p-2"
                    >
                      <SVGIcon
                        name="sms"
                        className="inline-block size-6 group-hover:fill-primary dark:fill-neutral-100"
                      />
                      <span className="mr-5 inline-block text-nowrap text-black group-hover:text-primary dark:text-neutral-100">
                        تیکت ها
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <button
                  onClick={hadnleShowModal}
                  className="w-full text-nowrap p-2 text-right"
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
          className={cn(
            "fixed inset-0 left-0 top-0 z-10 bg-black/30 opacity-0 backdrop-blur-sm transition-all duration-300 lg:hidden",
            sidebarOpen ? "visible opacity-100" : "invisible",
          )}
        ></div>
      </div>
      <div className="flex h-full items-center justify-between">
        <button onClick={() => sidebarToggle(true)} className="md:hidden">
          <SVGIcon name="menu" className="size-6 dark:fill-neutral-500" />
        </button>
        <div className="hidden items-center gap-16 md:flex">
          <div>
            <Link href="/admin" className="flex items-center gap-3">
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
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="/profile"
                  className="text-black transition-colors duration-300 hover:text-primary dark:text-neutral-500"
                >
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/tickets"
                  className="text-black transition-colors duration-300 hover:text-primary dark:text-neutral-500"
                >
                  تیکت ها
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}

export default Header;
