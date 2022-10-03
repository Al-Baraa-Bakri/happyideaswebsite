import styled from "styled-components";
export const AddIdeaContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: ${({ isFocusInAdd }) => (isFocusInAdd ? 6 : 4)};
  width: 100%;
  transform: ${({ isFocusInAdd }) =>
    isFocusInAdd ? "translateY(-60%)" : "translateY(0)"};
  transition: 250ms ease-out;
`;
export const AddIdeaTitle = styled.input`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.topBudy};
  padding: 0.8rem;
  border: none;
  width: 100%;

  outline: none;
  &::placeholder {
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.topBudy};
    visibility: visible;
    transition: 250ms linear;
  }
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

export const IdeaPargraphForAdd = styled.textarea`
  width: 100%;
  min-height: 100px;
  color: #333;
  font-size: 18px;
  font-weight: 400;
  padding: 12px 20px;
  border: 1px solid #ccc;
  border-radius: 14px;
  /* background-color: #f8f8f8; */
  outline: none;
  resize: none;
  &::placeholder {
    font-size: 18px;
    font-weight: 400;
    color: #333;
    visibility: visible;
    transition: 250ms linear;
  }
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;
export const PostButton = styled.button`
  border-radius: calc(0.5 * 32px);
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 1px 2px rgb(0 0 0 / 23%);
  font-weight: 400;
  min-width: 32px;
  color: ${({ theme }) => theme.colorHeader};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.topBudy};
  font-size: ${({ theme }) => theme.fontmd};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: 250ms ease-in-out;
  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.topBudy};
    border: none;
  }
`;
export const ImageButton = styled.button`
  border-radius: calc(0.5 * 32px);
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 1px 2px rgb(0 0 0 / 23%);
  font-weight: 400;
  min-width: 32px;
  color: ${({ theme }) => theme.colorHeader};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.topBudy};
  font-size: ${({ theme }) => theme.fontmd};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: 250ms ease-in-out;
  position: relative;
  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.topBudy};
    border: none;
  }
`;

export const TakeFlile = styled.input`
  display: none;
`;

export const SelectedImageContainer = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
`;
export const SelectedImage = styled.img`
  aspect-ratio: 2/1.5;
  align-self: center;
  object-fit: contain;
  width: 350px;
`;

export const AddIdeaForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const AddIdeaHeader = styled.h5``;
