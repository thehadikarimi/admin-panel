"use client";

import { createContext, useContext, useState } from "react";

import Modal from "@/components/modules/Modal";

import useToggle from "@/hooks/useToggle";
import SVGIcon from "@/components/elements/SVGIcon";

const ModalContext = createContext();

const initialData = {
  headText: "",
  bodyText: "",
  buttonText: "",
  onAcceptHandler: "",
};

function ModalProvider({ children }) {
  const [modal, modalToggle] = useToggle(false);
  const [data, setData] = useState(initialData);

  const openModal = (newState = {}) => {
    modalToggle(true);
    setData(newState);
  };

  const closeModal = () => {
    modalToggle(false);
    setTimeout(() => setData(initialData), 300);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal state={modal} stateToggle={closeModal}>
        <div className="flex flex-col">
          <div className="mx-5 flex items-center border-b border-neutral-500 py-5 dark:border-neutral-700">
            <div className="grow text-sm font-bold lg:text-base">
              {data.headText || "عنوان مودال"}
            </div>
            <button onClick={closeModal} className="flex">
              <SVGIcon name="close" className="size-6 dark:fill-neutral-500" />
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
    </ModalContext.Provider>
  );
}

const useModal = () => {
  const context = useContext(ModalContext);
  if (context) {
    return context;
  }
  throw Error("modalContext is not defined");
};

export { useModal };

export default ModalProvider;
