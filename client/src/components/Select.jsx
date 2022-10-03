import React, { useState } from "react";
import { css } from "styled-components";
import styled from "styled-components";
const SelectContainer = styled.div`
  position: relative;
  margin: 0;
`;

const SelectLabelButton = styled.button`
  padding: 0.3rem 0.5rem;
  min-width: 7rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  color: #222;
  align-items: center;
  justify-content: space-between;
  border: 1px solid slategray;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 #ccc;
  transition: 0.3s ease;
  &:hover {
    background-color: #eee;
  }
`;

const DropdownStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  @media (max-width: 500px) {
    left: -50%;
  }
  max-height: 10rem;
  min-width: 10rem;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 5px;
  background: #fafafa;
  border: 1.5px solid slategrey;
  transition: max-height 0.2s ease;
  overflow-y: scroll;
  ${(p) =>
    p.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.15rem 0;
  padding: 0.2rem 0.8rem;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  color: #333;
  cursor: pointer;
  ${(p) =>
    p.active &&
    css`
      color: #52b035;
      font-weight: 500;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #2222225f;
    color: #fafafa;
    outline: none;
  }
`;

const Select = ({ label, values, onChange, setFormIdSection }) => {
  const [currentValue, setCurrentValue] = useState(label);
  const [sectionId, setSectionId] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (value, id) => {
    setCurrentValue(value);
    setSectionId(id);
    setFormIdSection(id);
  };
  const handleChange = (value, id) => {
    handleValueChange(value, id);
    if (onChange) onChange(value);
    handleClose();
  };
  return (
    <SelectContainer>
      <SelectLabelButton onClick={(e) => handleOpen(e)}>
        {currentValue}
      </SelectLabelButton>
      <DropdownStyle isVisible={open}>
        {values.map((value, index) => (
          <DropdownItem
            onClick={() => handleChange(value.name, value.id)}
            active={value.name === currentValue}
            key={index}
          >
            {value.name}
          </DropdownItem>
        ))}
      </DropdownStyle>
    </SelectContainer>
  );
};

export default Select;
