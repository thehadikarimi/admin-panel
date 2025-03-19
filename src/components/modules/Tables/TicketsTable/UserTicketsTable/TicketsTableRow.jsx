import Link from "next/link";

import SVGIcon from "@/components/elements/SVGIcon";
import {
  Dropdown,
  DropdownContent,
  DropdownToggle,
} from "@/components/modules/Dropdown";

function TicketsTableRow({ ticketData }) {
  return (
    <tr className="h-14 text-neutral-900 transition-colors duration-300 *:px-3 lg:h-16 dark:text-neutral-500">
      <td>{ticketData.updatedAt || "_"}</td>
      <td
        className="hidden overflow-hidden text-ellipsis sm:table-cell"
        colSpan={2}
      >
        {ticketData.title || "_"}
      </td>
      <td className="hidden md:table-cell">
        {ticketData.status === "READ" ? "بسته شده" : "باز"}
      </td>
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
                    href={`/profile/tickets/${ticketData._id}`}
                    className="block rounded p-1.5 text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
                    مشاهده
                  </Link>
                </li>
              </ul>
            </DropdownContent>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
}

export default TicketsTableRow;
