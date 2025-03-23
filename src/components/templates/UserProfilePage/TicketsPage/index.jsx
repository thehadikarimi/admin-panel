"use client";

import Loading from "@/components/elements/Loading";
import SVGIcon from "@/components/elements/SVGIcon";
import AddTicketModal from "@/components/modules/Modals/AddTicketModal";
import UserTicketsTable from "@/components/modules/Tables/TicketsTable/UserTicketsTable";

import useToggle from "@/hooks/useToggle";
import { useGetProfile } from "@/services/queries";

function TicketsPage() {
  const { data, isPending } = useGetProfile();
  const [addModal, addModalToggle] = useToggle();

  if (isPending) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <div className="c-container">
        <div className="flex justify-between">
          <h2 className="title">تیکت ها</h2>
          <div className="flex items-center">
            <button
              onClick={() => addModalToggle(true)}
              className="flex items-center gap-1 rounded-full border border-neutral-500 px-2 py-1 dark:border-neutral-700"
            >
              <span className="text-xs lg:text-sm">ارسال تیکت جدید</span>
              <SVGIcon name="add" className="size-4 lg:size-5" />
            </button>
          </div>
        </div>
        <UserTicketsTable userId={data.data.user._id} />
        <AddTicketModal
          userId={data.data.user._id}
          state={addModal}
          stateToggle={addModalToggle}
        />
      </div>
    </div>
  );
}

export default TicketsPage;
