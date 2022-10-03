import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ModalContext } from "../../Context/ModalContext";
import { AppContaxt } from "../../Context/AppContext";
import MyImage from "../LazyLoad";

// import MyImage from "../../utils/lazyLoad";

// const Container = styled.div`
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

//   div {
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: flex-start;
//     padding-bottom: 0.5rem;
//     gap: 1rem;

//     img {
//       aspect-ratio: 4/2;
//       @media (max-width: 450px) {
//         aspect-ratio: 3/2;
//       }
//     }
//     div {
//       width: 100%;
//       display: flex;
//       flex-direction: column;
//       justify-content: flex-start;
//       align-items: flex-start;
//       gap: 0.9rem;
//       padding-right: 2rem;
//       padding-left: 0.5rem;
//       h3 {
//         color: ${({ theme }) => theme.topBudy};
//         font-size: ${({ theme }) => theme.fontxl};
//         font-weight: 500;
//         @media (max-width) {
//           font-size: ${({ theme }) => theme.fontlg};
//         }
//       }
//       p {
//         color: ${({ theme }) => theme.header};
//         font-size: 18px;
//         font-weight: 400;
//         line-height: 1.9rem;
//         @media (max-width) {
//           font-size: ${({ theme }) => theme.fontlg};
//           font-size: 16px;
//         }
//       }
//     }
//   }
// `;

// const Icons = styled.article`
//   width: 50%;
//   margin: 1rem auto;
//   transform: translateY(0.6rem);
//   display: flex;
//   justify-content: center;
//   gap: 2rem;
//   align-items: center;
//   color: ${({ theme }) => theme.topBudy};
// `;
// const IconContainer = styled.article`
//   cursor: pointer;
//   background-color: white;
//   height: 60px;
//   width: 60px;
//   @media (max-width: 400px) {
//     height: 14vw;
//     width: 14vw;
//     padding: 0.5rem;
//   }

//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid #33333367;
//   transition: 250ms ease-in-out;
//   &:hover {
//     background-color: ${({ theme }) => theme.topBudy};
//     color: white;
//     border: none;
//   }
// `;

// const ChooseSeason = styled.button`
//   cursor: pointer;
//   background-color: ${({ isChoosen }) => (isChoosen ? 'green' : 'white')};
//   height: 60px;
//   width: 60px;
//   border-radius: 50%;
//   border: 1px solid #33333367;
//   transition: 250ms ease-in-out;
//   position: relative;
//   &::after,
//   &::before {
//     content: '';
//     position: absolute;
//     background-color: ${({ isChoosen }) => (isChoosen ? 'white' : '#494747')};
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
//   &::after {
//     height: 4px;
//     width: 20px;
//   }
//   &::before {
//     height: 20px;
//     width: 4px;
//   }
// `;

const Container = styled.div`
  position: relative;
  min-height: 190px;
  height: 100%;

  @media (max-width: 500px) {
    min-height: 100px;
  }
`;
const SeasonImage = styled.img`
  aspect-ratio: 2.1/1.3;
  height: 100%;
`;
const SeasonOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 32px;
  font-weight: 400;
  @media (max-width: 540px) {
    font-size: 20px;
  }
`;

const Season = ({ id, name, image }) => {
  const { openModal } = useContext(ModalContext);
  const { seasons } = useContext(AppContaxt);
  const PR = `${process.env.REACT_APP_ROOT}/images/`;
  return (
    <>
      <Container>
        {/* <SeasonImage src={`${PR}${image}`} /> */}
        <MyImage
          image={{ src: `${PR}${image}`, alt: "Section Image", height: "100%" }}
        />
        <Link to={`/section/${id}`}>
          <SeasonOverlay>
            <span>{name}</span>
          </SeasonOverlay>
        </Link>
      </Container>
    </>
  );
};

export default Season;
