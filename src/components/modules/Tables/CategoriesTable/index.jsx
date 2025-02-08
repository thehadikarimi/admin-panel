"use client";

import CategoryTableRow from "./CategoryTableRow";
import Loading from "@/components/elements/Loading";

import { useGetCategories } from "@/services/queries";

function CategoriesTable() {
  const { data, isPending } = useGetCategories();

  return (
    <div className="mt-5">
      <table className="w-full table-fixed whitespace-nowrap text-sm lg:text-base">
        <thead className="h-14 bg-neutral-500 transition-colors duration-300 lg:h-16 dark:bg-neutral-900">
          <tr className="text-right text-neutral-900 *:px-3 dark:text-neutral-500">
            <th className="rounded-tr-lg">نام دسته بندی</th>
            <th className="hidden sm:table-cell">تعداد کاربران</th>
            <th colSpan={2} className="hidden md:table-cell">
              توضیحات
            </th>
            <th className="rounded-tl-lg"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-500 dark:divide-neutral-700">
          {isPending ? (
            <tr className="relative h-14 *:px-3 lg:h-16">
              <td className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
                <Loading />
              </td>
            </tr>
          ) : data?.data.categories.length ? (
            data?.data.categories.map((category) => (
              <CategoryTableRow key={category._id} categoryData={category} />
            ))
          ) : (
            <tr className="relative h-14 *:px-3 lg:h-16">
              <td className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-neutral-900 dark:text-neutral-500">
                هیچ دسته بندی یافت نشد.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesTable;
