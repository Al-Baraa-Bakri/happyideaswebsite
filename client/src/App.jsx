import { useContext, useState, useEffect, useRef } from "react";
import { GlobalStyle } from "./style/GlobalStyle";
import Home from "./pages/Home";
import Section from "./pages/Section";
import { Routes, Route } from "react-router-dom";
import AddButton from "./components/Home/AddButton";
import Modal from "react-modal";
import { ModalContext } from "./Context/ModalContext";
import { SendIdeaContext } from "./Context/SendIdeaContext";
import { BsPencilFill, BsFillImageFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "./style/loader.css";
import axios from "axios";
import {
  AddIdeaContainer,
  AddIdeaHeader,
  AddIdeaTitle,
  AddIdeaForm,
  ButtonsContainer,
  PostButton,
  ImageButton,
  TakeFlile,
  SelectedImageContainer,
  SelectedImage,
  IdeaPargraphForAdd,
} from "./components/Home/Modal/ModalComponents";
import { AppContaxt } from "./Context/AppContext";
import Select from "./components/Select";
import { ImageModalContext } from "./Context/ImageModalContext";
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
function App() {
  const { modalIsOpen, closeModal } = useContext(ModalContext);
  const PF = `${process.env.REACT_APP_ROOT}/images/`;

  const { imageModalIsOpen, imageCloseModal, selectedImage } =
    useContext(ImageModalContext);

  const { seasons, setSeasons, setLoadingSeasons } = useContext(AppContaxt);
  const { loadingSend, sendIdea, setLoadingSend } = useContext(SendIdeaContext);
  const [formDescValue, setFormDescValue] = useState("");
  const [formIdSection, setFormIdSection] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const ideaDescRef = useRef(null);
  const takeImageRef = useRef(null);
  console.log(SelectedImage);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview("");
    }
  }, [image]);

  useEffect(() => {
    setLoadingSeasons(true);
    const getSeasons = async () => {
      console.log(`${process.env.REACT_APP_ROOT}/api/section`);
      const { data } = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/section`
      );
      console.log("Sdfsff");
      setSeasons(data.sections);
      setLoadingSeasons(false);
    };
    getSeasons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIdSection) {
      toast.warning("حدد القسم", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!formDescValue) {
      toast.warning("ادخل شرحا عن الفكرة", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      ideaDescRef.current.focus();

      return;
    }
    setFormDescValue("");
    setFormIdSection("");
    setPreview("");
    setImage(null);
    setLoadingSend(true);

    const DATA = {
      ideaDesc: formDescValue,
      ideaSection: formIdSection,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      DATA.ideaImage = fileName;
      console.log("IMAGE", image);
      data.append("name", fileName);
      data.append("file", image);
      try {
        await axios.post(`${process.env.REACT_APP_ROOT}/api/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }

    await sendIdea(DATA);
    closeModal();
  };

  const handleImageButton = (e) => {
    e.preventDefault();
    takeImageRef.current.click();
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  return (
    <>
      <GlobalStyle />
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
          src={PF + selectedImage}
          alt="prev"
        />
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setFormDescValue("");
          setFormIdSection("");
          setPreview("");
          setImage(null);
          closeModal();
        }}
        style={{
          ...customStyles,
          overlay: {
            backgroundColor: "#0000002f",
            backdropFilter: "blur(4px)",
          },
        }}
        contentLabel="Example Modal"
      >
        {loadingSend ? (
          <>
            <svg
              id="loading-spinner"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <g fill="none">
                <path
                  id="track"
                  fill="#C6CCD2"
                  d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"
                />
                <path
                  id="section"
                  fill="#3F4850"
                  d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"
                />
              </g>
            </svg>
          </>
        ) : (
          !loadingSend && (
            <AddIdeaContainer>
              <AddIdeaForm onSubmit={handleSubmit}>
                <AddIdeaHeader></AddIdeaHeader>
                <Select
                  label={"اختر القسم"}
                  values={seasons.map((s) => {
                    return {
                      name: s.sectionName,
                      id: s._id,
                    };
                  })}
                  setFormIdSection={setFormIdSection}
                />
                <IdeaPargraphForAdd
                  placeholder="أضف شرحا للفكرة"
                  value={formDescValue}
                  onChange={(e) => setFormDescValue(e.target.value)}
                  ref={ideaDescRef}
                />
                <ButtonsContainer>
                  <PostButton onClick={handleSubmit}>
                    <BsPencilFill />
                    <span>نشر</span>
                  </PostButton>
                  <ImageButton onClick={(e) => handleImageButton(e)}>
                    <BsFillImageFill />
                    <span>صورة</span>
                  </ImageButton>
                  <TakeFlile
                    type={"file"}
                    ref={takeImageRef}
                    onChange={(e) => handleChangeImage(e)}
                    accept="image/*"
                    name="file"
                  />
                </ButtonsContainer>
                {preview && (
                  <SelectedImageContainer>
                    <SelectedImage src={preview} />
                  </SelectedImageContainer>
                )}
              </AddIdeaForm>
            </AddIdeaContainer>
          )
        )}
      </Modal>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section/:id" element={<Section />} />
      </Routes>
      <AddButton />
    </>
  );
}

export default App;
