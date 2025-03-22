import { jalaliDate } from "@/utils/helper";

function TicketPageHeader({ ticketData }) {
  return (
    <div className="c-container top-3 h-fit md:sticky md:w-1/3 lg:top-5">
      <h2 className="title">{ticketData.title}</h2>
      <div className="mt-5 grid gap-y-4 rounded-lg border border-neutral-500 py-4 text-sm sm:grid-cols-2 md:grid-cols-1 lg:text-base dark:border-neutral-900">
        <div className="border-neutral-500 px-4 text-black sm:border-l md:border-none dark:border-neutral-900 dark:text-neutral-500">
          <span>تاریخ: </span>
          <span>{jalaliDate(ticketData.updatedAt)}</span>
        </div>
        <div className="px-4 text-black dark:text-neutral-500">
          <span>وضعیت: </span>
          <span>
            {ticketData.status === "READ" ? "خوانده شده" : "خوانده نشده"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TicketPageHeader;
