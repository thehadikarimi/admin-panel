"use client";

import Modal from ".";
import SVGIcon from "@/components/elements/SVGIcon";

import { useModal } from "@/context/ModalProvider";

function DefaultModal() {
  const { data, closeModal } = useModal();

  return (
    <Modal state={data.modalState} stateToggle={closeModal}>
      <div className="flex flex-col">
        <div className="mx-5 flex items-center border-b border-neutral-500 py-5 dark:border-neutral-700">
          <div className="grow text-sm font-bold lg:text-base">
            {data.headText || "عنوان مودال"}
          </div>
          <button onClick={closeModal} className="flex">
            <SVGIcon name="close" className="size-6" />
          </button>
        </div>
        <div className="p-5">
          <div className="mb-7 mt-2 text-xs lg:text-sm">
            {data.bodyText || "متن مودال"}
          </div>
          <div className="flex w-full justify-end gap-4">
            <button
              onClick={closeModal}
              className="flex-1 rounded-lg border border-error p-3 text-xs text-error lg:flex-initial"
            >
              انصراف
            </button>
            <button
              onClick={data.onAcceptHandler || null}
              className="flex-1 rounded-lg border border-error bg-error p-3 text-xs text-white lg:flex-initial"
            >
              {data.buttonText || "دکمه مودال"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DefaultModal;
