import { useEffect, useContext } from "react";
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import Modal from "react-modal";
import { ImageModalContext } from "./Context/ImageModalContext";
import { SectionsContext } from "./Context/SectionsContext";
import { ideasContext } from "./Context/IdeasContext";
import Index from "./components/ViewDataComponent";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    zIndex: 10,
    border: "none",
  },
};
function Dashboard() {
  const { sections, fetchSections } = useContext(SectionsContext);
  const { ideas, fetchIdeas } = useContext(ideasContext);
  const { ideasWaiting, fetchIdeasWaiting } = useContext(ideasContext);
  const { imageCloseModal, imageModalIsOpen, selectedImage } =
    useContext(ImageModalContext);
  const PR = `${import.meta.env.VITE_APP_ROOT}/images/`;

  useEffect(() => {
    const getSections = async () => {
      await fetchSections();
      await fetchIdeas();
      await fetchIdeasWaiting();
    };
    getSections();
  }, []);

  const handleBack = () => {
    localStorage.removeItem("admin");
    window.location.reload();
  };
  return (
    <>
      <Modal
        isOpen={imageModalIsOpen}
        onRequestClose={() => {
          imageCloseModal();
        }}
        style={{
          ...customStyles,
          overlay: {
            backgroundColor: "#0000002f",
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <img
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            textAlign: "center",
            borderRadius: "12%",
          }}
          src={PR + selectedImage}
          alt="prev"
        />
      </Modal>
      <Box padding="2rem">
        <Tabs isFitted variant="enclosed" marginTop={"1rem"}>
          <TabList mb="1em">
            <Tab>??????????????</Tab>
            <Tab>??????????????</Tab>
            <Tab>?????????? ?????????? ????????????????</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Index
                headers={["?????? ??????????", "???????? ??????????", "??????"]}
                type="sections"
                DataForLooping={sections}
              />
            </TabPanel>
            <TabPanel>
              <Index
                headers={["?????? ????????????", "???????? ????????????", "??????"]}
                type="ideas"
                DataForLooping={ideas}
              />
            </TabPanel>

            <TabPanel>
              <Index
                headers={["?????? ????????????", "???????? ????????????", "?????? / ????????"]}
                type="ideasForWait"
                DataForLooping={ideasWaiting}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Button
          colorScheme={"red"}
          position={"fixed"}
          top={"2.5vh"}
          onClick={handleBack}
          size="sm"
          fontSize={"12px"}
        >
          ?????????? ????????????
        </Button>
      </Box>
    </>
  );
}

export default Dashboard;
