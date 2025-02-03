import Link from "next/link";

import SVGIcon from "@/components/elements/SVGIcon";
import { Dropdown, DropdownContent, DropdownToggle } from "../../Dropdown";

function UserTableRow({ data }) {
  return (
    <tr className="h-14 text-neutral-900 transition-colors duration-300 *:px-3 lg:h-16 dark:text-neutral-500">
      <td>
        <div className="flex flex-col">
          <span>{data.name}</span>
          <span className="text-[.85em]">
            {data.role === "ADMIN" ? "مدیر" : "کاربر"}
          </span>
        </div>
      </td>
      <td className="hidden sm:table-cell">{data.phoneNumber}</td>
      <td className="hidden xl:table-cell">{data.category}</td>
      <td className="hidden md:table-cell">آخرین پرداختی</td>
      <td>
        <div className="flex items-center justify-center">
          <Dropdown className="flex">
            <DropdownToggle>
              <SVGIcon
                name="moreVert"
                className="size-6 dark:fill-neutral-500"
              />
            </DropdownToggle>
            <DropdownContent className="top-full z-[2] mt-2 w-36 rounded-lg border border-neutral-200 bg-white shadow-md dark:border-neutral-700 dark:bg-dark-500">
              <ul className="p-2">
                <li>
                  <Link
                    href={`/admin/users/${data._id}`}
                    className="block rounded p-1.5 text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
                    مشاهده
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/admin/users/${data._id}?edit=true`}
                    className="block rounded p-1.5 text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
                    ویرایش
                  </Link>
                </li>
                <li>
                  <button className="block w-full rounded p-1.5 text-right text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700">
                    حذف
                  </button>
                </li>
              </ul>
            </DropdownContent>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
}

export default UserTableRow;
