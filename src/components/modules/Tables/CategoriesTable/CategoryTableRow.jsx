import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  Dropdown,
  DropdownContent,
  DropdownToggle,
} from "@/components/modules/Dropdown";
import SVGIcon from "@/components/elements/SVGIcon";
import UpdateCategoryModal from "@/components/modules/Modals/UpdateCategoryModal";

import { useModal } from "@/context/ModalProvider";

import useToggle from "@/hooks/useToggle";
import { useDeleteCategory } from "@/services/mutations";

function CategoryTableRow({ categoryData }) {
  const queryClient = useQueryClient();

  const { mutate } = useDeleteCategory();
  const { openModal, closeModal } = useModal();
  const [updateModal, updateModalToggle] = useToggle();

  const deleteHandler = () => {
    mutate(categoryData._id, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        closeModal();
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (error) => {
        toast.error(error.data.message || "خطا در برقراری ارتباط");
      },
    });
  };

  const deleteModal = () => {
    openModal({
      headText: "حذف دسته بندی",
      bodyText:
        "با حذف دسته بندی، کاربران نیز از دسته بندی خارج می شوند. آیا اطمینان دارید؟",
      buttonText: "حذف دسته بندی",
      onAcceptHandler: deleteHandler,
    });
  };

  return (
    <tr className="h-14 text-neutral-900 transition-colors duration-300 *:px-3 lg:h-16 dark:text-neutral-500">
      <td className="overflow-hidden text-ellipsis">{categoryData.name}</td>
      <td className="hidden sm:table-cell">{categoryData.userQuantity}</td>
      <td
        colSpan={2}
        className="hidden overflow-hidden text-ellipsis md:table-cell"
      >
        {categoryData.description}
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
                  <button
                    onClick={() => updateModalToggle(true)}
                    className="block w-full rounded p-1.5 text-right text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700"
                  >
                    ویرایش
                  </button>
                </li>
                <li>
                  <button
                    onClick={deleteModal}
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
      <UpdateCategoryModal
        state={updateModal}
        stateToggle={updateModalToggle}
        categoryData={categoryData}
      />
    </tr>
  );
}

export default CategoryTableRow;
