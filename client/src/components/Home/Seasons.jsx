import React, { useContext } from "react";
import Season from "../../components/Home/Season";
import styled from "styled-components";
import { AppContaxt } from "../../Context/AppContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import axios from 'axios';
// import { getAllSeasons } from '../../../Apis/seasons';
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  padding-top: 0;
  background-color: #f8f6f685;
  margin-top: 4rem;
  gap: 30px 25px;
  width: 90vw;
  height: ${({ loadingSeasons }) => loadingSeasons && "50vh"};
  padding-bottom: 2rem;
  @media (max-width: 765px) {
    grid-template-columns: repeat(2, 1fr);
    height: ${({ loadingSeasons }) => loadingSeasons && "30vh"};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  word-spacing: 0.1rem;
`;

const SeasonsTitle = styled.h2`
  color: ${({ theme }) => theme.header};
  font-size: 38px;
  text-align: center;
  font-weight: 500;
  word-spacing: 0.1rem;
  @media (max-width: 400px) {
    font-size: 22px;
  }
`;
const SkeletonStyle = styled(Skeleton)`
  min-height: 126px;
  min-width: 100%;
  @media (max-width: 765px) {
    display: ${({ noMobile }) => noMobile && "none"};
  }
`;
const Seasons = () => {
  const { seasons, loadingSeasons } = useContext(AppContaxt);

  return (
    <Container>
      <Section id="seasons" loadingSeasons={loadingSeasons}>
        {loadingSeasons ? (
          <>
            <SkeletonStyle sqaure count={"2"} />
            <SkeletonStyle sqaure count={"2"} />
            <SkeletonStyle sqaure count={"2"} noMobile={true} />
            <SkeletonStyle sqaure count={"2"} noMobile={true} />
          </>
        ) : (
          <>
            {seasons.map((s, i) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Season
                  key={i}
                  id={s._id}
                  name={s.sectionName}
                  image={s.sectionImage}
                  desc={s.sectionDesc}
                />
              );
            })}
          </>
        )}
      </Section>
    </Container>
  );
};

export default Seasons;
