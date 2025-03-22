import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import SVGIcon from "@/components/elements/SVGIcon";

import { cn, jalaliDate } from "@/utils/helper";

function TicketCard({ data, userId }) {
  return (
    <div
      className={cn(
        "flex gap-4 sm:gap-6",
        userId !== data.authorId && "flex-row-reverse",
      )}
    >
      <div>
        <SVGIcon
          name="accountCircle_1"
          className="size-8 fill-neutral-700/30 sm:size-16 dark:fill-neutral-700"
        />
      </div>
      <div
        className={cn(
          "flex-1 rounded-xl border p-2 sm:rounded-3xl sm:p-5",
          userId !== data.authorId
            ? "!rounded-tl-none border-neutral-500 dark:border-neutral-900"
            : "!rounded-tr-none border-primary/30 bg-primary/10",
        )}
      >
        <p
          className="text-right text-xs sm:text-sm"
          style={{ direction: "ltr" }}
        >
          {jalaliDate(data.createdAt, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <hr className="my-2 block border-neutral-500 dark:border-neutral-900" />
        <p
          className="text-sm sm:text-base"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(data.message.replace(/(\r\n|\r|\n)/g, "<br>")),
          }}
        ></p>
        {data.image.link ? (
          <div className="mt-3 sm:mt-6">
            <Link
              href={data.image.link}
              target="_blank"
              className="flex items-center justify-center gap-3 rounded-full border border-neutral-500 p-2 text-xs sm:p-3 sm:text-sm dark:border-neutral-900"
            >
              <SVGIcon
                name="link"
                className="size-5 sm:size-6 dark:fill-neutral-500"
              />
              <span>مشاهده فایل</span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TicketCard;
