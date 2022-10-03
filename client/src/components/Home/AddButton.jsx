import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../../Context/ModalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddIdea } from "../../pages/Section";
const AbsoluteAddButton = styled(AddIdea)`
  width: 140px;
  height: 45px;
  font-size: ${({ isAddIdeaMode }) => (isAddIdeaMode ? "14px" : "18px")};
  padding: 1rem;
  position: fixed;
  top: 90vh;
  right: 5vw;
  text-transform: uppercase;

  font-weight: 500;
  color: ${({ isAddIdeaMode }) => (isAddIdeaMode ? "white" : "#222")};
  background-color: ${({ isAddIdeaMode }) => (isAddIdeaMode ? "red" : "white")};
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  @media (max-width: 500px) {
    font-size: 12px;
    width: ${({ isAddIdeaMode }) => (isAddIdeaMode ? "100px" : "95px")};
    right: 10vw;
    top: 80vh;
    padding: 0;
  }
  &:hover {
    background-color: #52b035;
    background-color: ${({ isAddIdeaMode }) =>
      isAddIdeaMode ? "red" : "#52b035;"};
    box-shadow: 0px 15px 20px rgba(215, 219, 218, 0.4);
    color: ${({ isAddIdeaMode }) => (isAddIdeaMode ? "white" : "white;")};

    transform: translateY(-7px);
  }
`;

const AddButton = () => {
  const { openModal, modalIsOpen } = useContext(ModalContext);

  useEffect(() => {
    if (modalIsOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [modalIsOpen]);

  const handleClickButton = () => {
    openModal();
  };

  const toastStyle = {
    fontSize: "16px",
    aligItems: "top-center",
    fontFamily: "Cairo, sans-serif",
    marginTop: "0.5rem",
  };
  return (
    <>
      {" "}
      <ToastContainer
        className="toast"
        position="top-center"
        autoClose={1200}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={toastStyle}
      />
      <AbsoluteAddButton onClick={handleClickButton}>
        <span>اضافة فكرة</span>
      </AbsoluteAddButton>
    </>
  );
};

export default AddButton;
