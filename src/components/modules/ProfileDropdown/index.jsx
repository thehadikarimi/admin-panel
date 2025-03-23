import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import { useModal } from "@/context/ModalProvider";

import SVGIcon from "@/components/elements/SVGIcon";
import {
  Dropdown,
  DropdownToggle,
  DropdownContent,
} from "@/components/modules/Dropdown";
import Skeleton from "@/components/elements/Skeleton";

import { useGetProfile } from "@/services/queries";

function ProfileDropdown() {
  const { isPending, data } = useGetProfile();
  const { role, name } = data?.data.user || {};
  const router = useRouter();

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

  if (isPending) {
    return <Skeleton className="h-6 w-11 rounded-full" />;
  }

  return (
    <Dropdown className="relative">
      <DropdownToggle className="group flex cursor-pointer items-center">
        <SVGIcon
          name="chevronDown"
          className="size-5 transition-transform duration-300 group-aria-expanded:-rotate-180 dark:fill-neutral-500"
        />
        <SVGIcon name="person_0" className="size-6 dark:fill-neutral-500" />
      </DropdownToggle>
      <DropdownContent className="absolute left-0 top-10 z-[2] w-56 rounded-lg border border-neutral-200 bg-white shadow-md lg:top-12 dark:border-neutral-700 dark:bg-dark-500">
        <div className="block w-full border-b border-neutral-500 dark:border-neutral-700">
          <div className="flex items-center gap-2 px-4 py-4">
            <div>
              <Image
                className="size-10 dark:invert"
                src="/nextjs.svg"
                alt="Next.js logo"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{name}</span>
              <span className="text-xs">
                {role === "ADMIN" ? "مدیر" : "کاربر"}
              </span>
            </div>
          </div>
        </div>
        <ul className="divide-y divide-neutral-500 dark:divide-neutral-700">
          <li>
            <Link
              href={`/${role === "ADMIN" ? "admin" : "profile"}/personal-details`}
              className="block w-full"
            >
              <div className="flex items-center px-4 py-3">
                <div className="pl-4">
                  <SVGIcon name="accountCircle_0" className="size-6" />
                </div>
                <span className="text-sm">اطلاعات حساب کاربری</span>
              </div>
            </Link>
          </li>
          <li>
            <button className="block w-full" onClick={hadnleShowModal}>
              <div className="flex items-center px-4 py-3">
                <div className="pl-4">
                  <SVGIcon name="logout" className="size-6" />
                </div>
                <span className="text-sm">خروج از حساب کاربری</span>
              </div>
            </button>
          </li>
        </ul>
      </DropdownContent>
    </Dropdown>
  );
}

export default ProfileDropdown;
