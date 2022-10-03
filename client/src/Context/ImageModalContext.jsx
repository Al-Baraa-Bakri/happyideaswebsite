import { useState, createContext } from "react";
export const ImageModalContext = createContext();

const ImageModalProvider = ({ children }) => {
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = () => {
    setImageModalIsOpen(true);
  };
  const imageCloseModal = () => {
    console.log("DDDDDONE");
    setImageModalIsOpen(false);
  };
  return (
    <ImageModalContext.Provider
      value={{
        imageModalIsOpen,
        setImageModalIsOpen,
        openModal,
        imageCloseModal,
        selectedImage,
        setSelectedImage,
      }}
    >
      {children}
    </ImageModalContext.Provider>
  );
};
export default ImageModalProvider;
