import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Modal from "@/components/modules/Modal";
import SVGIcon from "@/components/elements/SVGIcon";
import Loading from "@/components/elements/Loading";

import { useUpdateUserPayment } from "@/services/mutations";

import { cn } from "@/utils/helper";

function PaymentStatusModal({ state, stateToggle, userId, payment }) {
  const [paymentStatus, setPymentStatus] = useState(payment.status);

  const queryClient = useQueryClient();
  const { isPending, mutate } = useUpdateUserPayment(userId);

  const updateHandler = () => {
    mutate(
      { _id: payment._id, status: paymentStatus },
      {
        onSuccess: (data) => {
          toast.success("وضعیت پرداخت با موفقیت ویرایش شد.");
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
            stateToggle(false);
          }, 300);
        },
        onError: (error) => {
          toast.error(error.data.message || "خطا در برقراری ارتباط");
        },
      },
    );
  };

  const buttons = [
    {
      status: "paid",
      text: "پرداخت شده",
      color: "bg-success text-neutral-500",
    },
    {
      status: "not-paid",
      text: "پرداخت نشده",
      color: "bg-error text-neutral-500",
    },
    {
      status: "unknown",
      text: "نامشخص",
      color:
        "bg-neutral-500 text-black dark:bg-neutral-700 dark:text-neutral-500",
    },
  ];

  return (
    <Modal state={state} stateToggle={stateToggle}>
      <div className="flex h-full flex-col">
        <div className="mx-5 flex items-center border-b border-neutral-500 py-5 dark:border-neutral-700">
          <div className="grow text-sm font-bold lg:text-base">
            ویرایش وضعیت پرداختی {payment.month} ماه
          </div>
          <button onClick={() => stateToggle(false)} className="flex">
            <SVGIcon name="close" className="size-6" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => setPymentStatus(button.status)}
                className={cn(
                  "rounded-lg p-3 text-sm opacity-50",
                  button.color,
                  paymentStatus === button.status &&
                    "relative opacity-100 before:absolute before:-right-1 before:-top-1 before:z-[1] before:size-4 before:rounded-full before:bg-white before:text-center before:text-xs before:leading-4 before:content-['✔️'] dark:before:bg-dark-500",
                )}
              >
                {button.text}
              </button>
            ))}
          </div>
          <div className="mt-5 flex w-full justify-end gap-4">
            <button
              onClick={() => stateToggle(false)}
              type="button"
              className="flex-1 rounded-lg border border-primary p-3 text-xs text-primary lg:flex-initial"
            >
              انصراف
            </button>
            <button
              disabled={paymentStatus === payment.status || isPending}
              onClick={updateHandler}
              className={cn(
                "flex flex-1 items-center justify-center rounded-lg border border-primary bg-primary px-3 text-xs text-white lg:flex-initial",
                paymentStatus === payment.status && "opacity-50",
              )}
            >
              {isPending ? <Loading /> : "ویرایش"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PaymentStatusModal;
