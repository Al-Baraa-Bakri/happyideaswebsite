
import { useState, createContext } from "react";
export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    console.log("DDDDDONE");
    setModalIsOpen(false);
  };
  return (
    <ModalContext.Provider
      value={{ modalIsOpen, setModalIsOpen, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export default ModalProvider;
