"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const initialData = {
  modalState: false,
  headText: "",
  bodyText: "",
  buttonText: "",
  onAcceptHandler: "",
};

function ModalProvider({ children }) {
  const [data, setData] = useState(initialData);

  const openModal = (newState = {}) => {
    setData((prevState) => ({ ...newState, modalState: true }));
  };

  const closeModal = () => {
    setData((prevState) => ({ ...prevState, modalState: false }));
    setTimeout(() => setData(initialData), 300);
  };

  return (
    <ModalContext.Provider value={{ data, openModal, closeModal }}>
      {children}
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
