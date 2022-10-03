import React from "react";
import styled from "styled-components";
const Container = styled.section`
  background-color: ${({ theme }) => theme.colorBackgroundHero};
  height: 100vh;
  background-image: url(https://khamsat.hsoubcdn.com/assets/images/hero-33cc6eb8f1a98f8aacf154a4ff4c5f76d5610553e8ba4accb6d22515a64a184a.jpg);
  color: #222222;
  background-size: cover;
  background-position: center 48%;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colorHeader};
  gap: 1rem;
  transform: translateY(-rem);
  @media (max-width: 500px) {
    transform: translateY(-4rem);
  }
  line-height: 30px;
`;
const HeaderText = styled.h1`
  font-size: ${({ theme }) => theme.fontlg};
  font-weight: 500;
  line-height: 50px;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

export const PargraphText = styled.h2`
  font-size: ${({ theme }) => theme.fontmd};
  font-weight: 300;
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

const Hero = () => {
  return (
    <Container>
      <Text>
        <HeaderText>مرحبا بكم في موقع أفكار سعادة</HeaderText>
        <PargraphText>
          المكان الذي تجد فيه أفكار سعيدة ربما تلهمك في رحلاتك القادمة.
          <br />
          شاهد الأقسام في الأسفل ولا تنسى مشاركتنا افكارك
        </PargraphText>
      </Text>
    </Container>
  );
};

export default Hero;
