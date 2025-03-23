import Modal from "../../Modal";
import AddTicketForm from "../../Forms/Ticket/AddTicketForm";
import SVGIcon from "@/components/elements/SVGIcon";

function AddTicketModal({ userId, state, stateToggle }) {
  return (
    <Modal state={state} stateToggle={stateToggle}>
      <div className="flex h-full flex-col">
        <div className="mx-5 flex items-center border-b border-neutral-500 py-5 dark:border-neutral-700">
          <div className="grow text-sm font-bold lg:text-base">
            ارسال تیکت جدید
          </div>
          <button onClick={() => stateToggle(false)} className="flex">
            <SVGIcon name="close" className="size-6" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <AddTicketForm userId={userId} stateToggle={stateToggle} />
        </div>
      </div>
    </Modal>
  );
}

export default AddTicketModal;
