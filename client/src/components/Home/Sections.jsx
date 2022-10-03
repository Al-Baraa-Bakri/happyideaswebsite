import React from "react";
import styled from "styled-components";
import Seasons from "../../components/Home/Seasons";
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

const Header = styled.h2`
  font-size: 26px;
  color: #212529;
  text-align: center;
  font-weight: 500;
`;
const Sections = () => {
  return (
    <Container>
      <Header>تصفح الأفكار السعيدة حسب الأقسام وشاركنا أفكارك</Header>
      <Seasons />
    </Container>
  );
};

export default Sections;
