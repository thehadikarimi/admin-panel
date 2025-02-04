import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import SVGIcon from "@/components/elements/SVGIcon";
import { Dropdown, DropdownContent, DropdownToggle } from "../../Dropdown";

import { useModal } from "@/context/ModalProvider";

import { useDeleteUser } from "@/services/mutations";
import { useGetProfile } from "@/services/queries";

function UserTableRow({ userData }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: profile } = useGetProfile();
  const { mutate } = useDeleteUser();
  const { openModal, closeModal } = useModal();

  const successHandler = async (data) => {
    if (data.data._id === profile.data.user._id) {
      try {
        const data = await signOut({
          redirect: false,
          callbackUrl: "/login",
        });
        setTimeout(() => router.push(data.url), 1000);
      } catch (error) {
        toast.error("خطا در برقراری ارتباط");
      }
    }

    toast.success(data.data.message);
    closeModal();
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const deleteHandler = () => {
    mutate(userData._id, {
      onSuccess: (data) => successHandler(data),
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  const modalHandler = () => {
    let modalData = {
      headText: "حذف حساب کاربری",
      buttonText: "حذف حساب",
      onAcceptHandler: deleteHandler,
    };

    if (profile.data.user._id === userData._id) {
      modalData.bodyText =
        "در حال حذف کردن حساب کاربری خود هستید. بعد از حذف حساب، دیگر به اطلاعات خود دسترسی نخواهید داشت. آیا از حذف حساب خود اطمینان دارید؟";
    } else {
      modalData.bodyText =
        "با حذف کردن حساب کاربری دیگر به اطلاعات آن دسترسی نخواهید داشت. آیا از حذف حساب اطمینان دارید؟";
    }

    openModal(modalData);
  };

  return (
    <tr className="h-14 text-neutral-900 transition-colors duration-300 *:px-3 lg:h-16 dark:text-neutral-500">
      <td>
        <div className="flex flex-col">
          <span>{userData.name}</span>
          <span className="text-[.85em]">
            {userData.role === "ADMIN" ? "مدیر" : "کاربر"}
          </span>
        </div>
      </td>
      <td className="hidden sm:table-cell">{userData.phoneNumber}</td>
      <td className="hidden xl:table-cell">{userData.category}</td>
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
                    href={`/admin/users/${userData._id}`}
                    className="block rounded p-1.5 text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
                    مشاهده
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/admin/users/${userData._id}?edit=true`}
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
