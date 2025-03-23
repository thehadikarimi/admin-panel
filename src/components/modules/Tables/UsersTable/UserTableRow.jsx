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

import { useDeleteUser } from "@/services/mutations";

function UserTableRow({ userData }) {
  const queryClient = useQueryClient();

  const { mutate } = useDeleteUser();
  const { openModal, closeModal } = useModal();

  const deleteHandler = () => {
    mutate(userData._id, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        closeModal();
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  const modalHandler = () => {
    openModal({
      headText: "حذف حساب کاربری",
      buttonText: "حذف حساب",
      bodyText:
        "با حذف کردن حساب کاربری دیگر به اطلاعات آن دسترسی نخواهید داشت. آیا از حذف حساب اطمینان دارید؟",
      onAcceptHandler: deleteHandler,
    });
  };

  const linkHandler = (isEdit = false) => {
    if (isEdit) {
      return `/admin/users/${userData._id}?edit=1`;
    } else {
      return `/admin/users/${userData._id}`;
    }
  };

  return (
    <tr className="h-14 text-neutral-900 *:px-3 lg:h-16 dark:text-neutral-500">
      <td>
        <div className="flex flex-col">
          <span className="overflow-hidden text-ellipsis">{userData.name}</span>
          <span className="text-[.85em]">
            {userData.role === "ADMIN" ? "مدیر" : "کاربر"}
          </span>
        </div>
      </td>
      <td className="hidden sm:table-cell">{userData.phoneNumber || "_"}</td>
      <td className="hidden xl:table-cell">{userData.category || "_"}</td>
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
                    href={linkHandler()}
                    className="block rounded p-1.5 text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
                    مشاهده
                  </Link>
                </li>
                <li>
                  <Link
                    href={linkHandler(true)}
                    className="block rounded p-1.5 text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
                    ویرایش
                  </Link>
                </li>
                <li>
                  <button
                    onClick={modalHandler}
                    className="block w-full rounded p-1.5 text-right text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
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
