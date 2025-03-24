import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import SVGIcon from "@/components/elements/SVGIcon";
import {
  Dropdown,
  DropdownContent,
  DropdownToggle,
} from "@/components/modules/Dropdown";

import { useModal } from "@/context/ModalProvider";

import { useDeleteTicket } from "@/services/mutations";
import { cn, jalaliDate } from "@/utils/helper";

function TicketsTableRow({ ticketData, userId, profile }) {
  const queryClient = useQueryClient();

  const { mutate } = useDeleteTicket();
  const { openModal, closeModal } = useModal();

  const deleteHandler = () => {
    mutate(ticketData._id, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        closeModal();
        queryClient.invalidateQueries({ queryKey: ["user-tickets", userId] });
      },
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  const modalHandler = () => {
    openModal({
      headText: "حذف تیکت",
      buttonText: "حذف تیکت",
      bodyText:
        "بعد از حذف تیکت دیگر به اطلاعات آن دسترسی نخواهید داشت. آیا مطمئن هستید؟",
      onAcceptHandler: deleteHandler,
    });
  };

  return (
    <tr
      className={cn(
        "h-14 text-neutral-900 *:px-3 lg:h-16 dark:text-neutral-500",
        ticketData.status === "READ" && "[&_td:not(:last-child)]:opacity-50",
      )}
    >
      <td>{jalaliDate(ticketData.updatedAt) || "_"}</td>
      <td
        className="hidden overflow-hidden text-ellipsis sm:table-cell"
        colSpan={2}
      >
        {ticketData.title || "_"}
      </td>
      <td className="hidden md:table-cell">
        {ticketData.status === "READ" ? "خوانده شده" : "خوانده نشده"}
      </td>
      <td>
        <div className="flex items-center justify-center">
          <Dropdown className="flex">
            <DropdownToggle>
              <SVGIcon
                name="moreVert"
                className={cn(
                  "size-6",
                  ticketData.status === "READ" && "opacity-50",
                )}
              />
            </DropdownToggle>
            <DropdownContent className="top-full z-[2] mt-2 w-36 rounded-lg border border-neutral-200 bg-white shadow-md dark:border-neutral-700 dark:bg-dark-500">
              <ul className="p-2">
                <li>
                  <Link
                    href={
                      (profile.role === "ADMIN" ? "/admin" : "/profile") +
                      `/tickets/${ticketData._id}`
                    }
                    className="block rounded p-1.5 text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
                    مشاهده
                  </Link>
                </li>
                {profile.role === "ADMIN" ? (
                  <li>
                    <button
                      onClick={modalHandler}
                      className="block w-full rounded p-1.5 text-right text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                    >
                      حذف
                    </button>
                  </li>
                ) : null}
              </ul>
            </DropdownContent>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
}

export default TicketsTableRow;
