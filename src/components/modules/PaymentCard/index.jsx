import PaymentStatusModal from "@/components/modules/Modals/PaymentStatusModal";
import SVGIcon from "@/components/elements/SVGIcon";

import useToggle from "@/hooks/useToggle";

import { cn, curMonth, curYear } from "@/utils/helper";

function PaymentCard({ userId, year, payment, isPass }) {
  const [paymentModal, paymentModalToggle] = useToggle(false);

  const isCurMonth = () => {
    if (curYear() === year.label && curMonth("long") === payment.month) {
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
          <button onClick={() => paymentModalToggle(true)}>
            <SVGIcon
              name="edit"
              className="size-4 transition-colors duration-300 lg:size-5 dark:fill-neutral-500"
            />
          </button>
        </div>
      )}
      <PaymentStatusModal
        state={paymentModal}
        stateToggle={paymentModalToggle}
        userId={userId}
        payment={payment}
      />
    </div>
  );
}

export default PaymentCard;
