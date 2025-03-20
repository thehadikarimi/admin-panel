"use client";

import Loading from "@/components/elements/Loading";
import TicketsTableRow from "./TicketsTableRow";

import { useGetUserTickets } from "@/services/queries";

function UserTicketsTable({ userId, qty = undefined }) {
  const { data, isPending } = useGetUserTickets(userId);

  return (
    <div className="mt-5">
      <table className="w-full table-fixed whitespace-nowrap text-sm lg:text-base">
        <thead className="h-14 bg-neutral-500 transition-colors duration-300 lg:h-16 dark:bg-neutral-900">
          <tr className="text-right text-neutral-900 *:px-3 dark:text-neutral-500">
            <th className="rounded-tr-lg">تاریخ</th>
            <th className="hidden sm:table-cell" colSpan={2}>
              عنوان
            </th>
            <th className="hidden sm:table-cell">وضعیت</th>
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
          ) : data?.data.tickets.length ? (
            data?.data.tickets
              .slice(0, qty)
              .map((ticket) => (
                <TicketsTableRow key={ticket._id} ticketData={ticket} />
              ))
          ) : (
            <tr className="relative h-14 *:px-3 lg:h-16">
              <td className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-neutral-900 dark:text-neutral-500">
                هیچ تیکتی ثبت نشده است.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTicketsTable;
