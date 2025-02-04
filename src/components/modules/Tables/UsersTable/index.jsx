"use client";

import UserTableRow from "./UserTableRow";
import Loading from "@/components/elements/Loading";

import { useGetUsers } from "@/services/queries";
import { curMonth } from "@/utils/helper";

function UsersTable({ qty = undefined }) {
  const { data, isPending } = useGetUsers();

  return (
    <div className="mt-3">
      <table className="w-full table-fixed whitespace-nowrap text-sm lg:mt-5 lg:text-base">
        <thead className="h-14 bg-neutral-500 transition-colors duration-300 lg:h-16 dark:bg-neutral-900">
          <tr className="text-right text-neutral-900 *:px-3 dark:text-neutral-500">
            <th className="rounded-tr-lg">نام و نام خانوادگی</th>
            <th className="hidden sm:table-cell">شماره تلفن</th>
            <th className="hidden xl:table-cell">دسته بندی</th>
            <th className="hidden md:table-cell">
              وضعیت پرداخت (ماه {curMonth("long")})
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
          ) : data?.data.users.length ? (
            data?.data.users
              .slice(0, qty)
              .map((user) => <UserTableRow key={user._id} userData={user} />)
          ) : (
            <tr className="relative h-14 *:px-3 lg:h-16">
              <td className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-neutral-900 dark:text-neutral-500">
                هیچ کاربری یافت نشد.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
