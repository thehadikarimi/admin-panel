import SVGIcon from "@/components/elements/SVGIcon";

import { cn, curMonth, curYear } from "@/utils/helper";
import { p2e } from "@/utils/replaceNumber";

function PaymentCard({ year, payment, isPass }) {
  const isCurMonth = () => {
    if (p2e(curYear()) === year.label && curMonth("long") === payment.month) {
      return true;
    }

    return false;
  };

  return (
    <div
      className={cn(
        "flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg transition-colors duration-300 lg:h-24 lg:w-24",
        payment.status === "paid" &&
          "bg-success text-neutral-500 [&_*]:fill-neutral-500",
        payment.status === "not-paid" &&
          "bg-error text-neutral-500 [&_*]:fill-neutral-500",
        payment.status === "unknown" &&
          "bg-neutral-500 text-black dark:bg-neutral-700 dark:text-neutral-500",
      )}
    >
      <p className="text-xs lg:text-sm">{year.label}</p>
      <p className="text-sm font-medium lg:text-base">{payment.month}</p>
      {isPass && !isCurMonth() ? null : (
        <div className="flex">
          <button>
            <SVGIcon
              name="edit"
              className="size-4 transition-colors duration-300 lg:size-5 dark:fill-neutral-500"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentCard;
