import { Dropdown, DropdownContent, DropdownToggle } from "../../Dropdown";
import SVGIcon from "@/components/elements/SVGIcon";

function CategoryTableRow({ categoryData }) {
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
                  <button className="block w-full rounded p-1.5 text-right text-xs hover:bg-neutral-500 lg:text-sm dark:hover:bg-neutral-700">
                    ویرایش
                  </button>
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

export default CategoryTableRow;
