import Link from "next/link";

import SVGIcon from "@/components/elements/SVGIcon";
import {
  Dropdown,
  DropdownToggle,
  DropdownContent,
} from "@/components/modules/Dropdown";

import { useGetProfile } from "@/services/queries";
import Image from "next/image";

function ProfileDropdown() {
  const { isPending, data } = useGetProfile();
  const { role, name } = data?.data.user || {};

  if (isPending) {
    return (
      <div className="h-6 w-11 animate-pulse rounded-full bg-neutral-500 dark:bg-dark-700"></div>
    );
  }

  return (
    <Dropdown className="relative">
      <DropdownToggle className="group flex cursor-pointer items-center">
        <SVGIcon
          name="chevronUp"
          className="size-5 transition-transform duration-300 group-aria-hidden:rotate-180 dark:fill-neutral-500"
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
              <span className="text-sm font-medium text-black dark:text-neutral-100">
                {name}
              </span>
              <span className="text-xs text-black dark:text-neutral-100">
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
                  <SVGIcon
                    name="accountCircle_0"
                    className="size-6 dark:fill-neutral-500"
                  />
                </div>
                <span className="text-sm text-black dark:text-neutral-100">
                  اطلاعات حساب کاربری
                </span>
              </div>
            </Link>
          </li>
          <li>
            <button className="block w-full">
              <div className="flex items-center px-4 py-3">
                <div className="pl-4">
                  <SVGIcon
                    name="logout"
                    className="size-6 dark:fill-neutral-500"
                  />
                </div>
                <span className="text-sm text-black dark:text-neutral-100">
                  خروج از حساب کاربری
                </span>
              </div>
            </button>
          </li>
        </ul>
      </DropdownContent>
    </Dropdown>
  );
}

export default ProfileDropdown;
