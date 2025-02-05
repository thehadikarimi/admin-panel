import Modal from "../../Modal";
import AddUserForm from "../../Forms/User/AddUserForm";
import SVGIcon from "@/components/elements/SVGIcon";

function AddUserModal({ state, stateToggle }) {
  return (
    <Modal state={state} stateToggle={stateToggle}>
      <div className="flex h-full flex-col">
        <div className="mx-5 flex items-center border-b border-neutral-500 py-5 dark:border-neutral-700">
          <div className="grow text-sm font-bold lg:text-base">
            افزودن کاربر
          </div>
          <button onClick={() => stateToggle(false)} className="flex">
            <SVGIcon name="close" className="size-6 dark:fill-neutral-500" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <AddUserForm stateToggle={stateToggle} />
        </div>
      </div>
    </Modal>
  );
}

export default AddUserModal;
