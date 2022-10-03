import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { BsPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PargraphText } from "../components/Home/Hero";
import { AppContaxt } from "../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import { ModalContext } from "../Context/ModalContext";
import Skeleton from "../components/Home/Section/Skleteon";
import Skleteon from "../components/Home/Section/Skleteon";
import { ImageModalContext } from "../Context/ImageModalContext";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  padding: 0.5rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid #2222226d;
  padding-bottom: 2rem;
  padding: 2rem;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;

const Location = styled.h4`
  font-size: 14px;
  color: #77869b;
  font-weight: 500;
`;

const SectionName = styled.h5`
  font-size: 22px;
  font-weight: 500;
  @media (max-width: 750px) {
    font-size: 18px;
  }
`;

export const AddIdea = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 3px 10px;
  background-color: #52b035;
`;

const IdeasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-right: 1rem;
`;

const Idea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid ${({ theme }) => theme.colorBackgroundHero};
  background-color: white;
  width: 80%;
  padding: 2rem 2rem;
  margin: 0rem auto;
  min-height: 14vw;
  gap: 1rem;

  @media (max-width: 700px) {
    gap: 2rem;
    padding-right: 1rem;
    width: 100%;
    margin: 0rem;
    align-items: center;
  }
`;

const IdeaText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
`;

const IdeaName = styled.h5`
  font-size: 22px;
  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

const IdeaDesc = styled.p`
  line-height: 2.5rem;
  min-width: 25vw;
  max-width: 25rem;
  @media (max-width: 400px) {
    max-width: 15rem;
  }
  word-break: ${({ isOneTallWord }) =>
    isOneTallWord == 1 ? "break-all" : "keep-all"};
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const IdeaImageContainer = styled.div`
  width: 30%;
  cursor: pointer;
`;

const IdeaImage = styled.img`
  @media (max-width: 700px) {
    border-radius: 50%;
    aspect-ratio: 1/1;
  }
`;

const ImageSkeleton = styled(Skeleton)`
  aspect-ratio: 4/2;
  width: 140px;
  height: 200px;
  @media (max-width: 700px) {
    border-radius: 50%;
    aspect-ratio: 1/1;
    width: 30%;
  }
`;

const SkeletonContaienr = styled.div`
  background-color: white;
  padding: 4rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  width: 100%;
`;

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  const [ideas, setIdeas] = useState([]);
  const { id } = useParams();
  const { seasons, loadingSeasons } = useContext(AppContaxt);
  const { openModal } = useContext(ModalContext);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const PF = `${process.env.REACT_APP_ROOT}/images/`;
  const { openModal: imageModalOpen, setSelectedImage } =
    useContext(ImageModalContext);
  useEffect(() => {
    const getSinglePost = async () => {
      setIsLoadingIdeas(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/section/${id}`
      );
      setIdeas(data.section.sectionIdeas);
      setIsLoadingIdeas(false);
    };
    getSinglePost();
    const name = seasons.filter((s) => s._id == id);
    setSectionName(name[0]?.sectionName);
  }, [id, seasons]);

  const hadleAddIdea = () => {
    openModal();
  };
  return (
    <Container>
      <Header>
        <Title>
          <Location>الرئيسية / الأفكار</Location>
          <SectionName>شاهد الأفكار الخاصة بقسم {sectionName}</SectionName>
        </Title>

        <AddIdea onClick={hadleAddIdea}>
          <BsPlus fontSize={"2rem"} />
          <span>اضافة فكرة</span>
        </AddIdea>
      </Header>
      {(ideas.length === 0) & !isLoadingIdeas ? (
        <PargraphText> لا يوجد أفكار في القسم </PargraphText>
      ) : (
        <></>
      )}
      {isLoadingIdeas ? (
        <SkeletonContaienr>
          <Skleteon />
          <Skleteon />
          <Skleteon />
        </SkeletonContaienr>
      ) : (
        <IdeasContainer>
          {ideas.length !== 0 &&
            ideas.map((i) => {
              return (
                <Idea>
                  <IdeaText>
                    <IdeaDesc isOneTallWord={i.ideaDesc.split(" ").length}>
                      {i.ideaDesc}
                    </IdeaDesc>
                  </IdeaText>
                  {i.ideaImage && (
                    <IdeaImageContainer
                      onClick={() => {
                        setSelectedImage(i.ideaImage);
                        imageModalOpen();
                      }}
                    >
                      <IdeaImage src={PF + i.ideaImage} />
                    </IdeaImageContainer>
                  )}
                </Idea>
              );
            })}
        </IdeasContainer>
      )}
    </Container>
  );
};

export default Section;
