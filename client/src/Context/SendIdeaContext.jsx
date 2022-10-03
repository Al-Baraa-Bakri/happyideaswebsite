import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState, createContext } from "react";
export const SendIdeaContext = createContext();

const SendIdeaProvider = ({ children }) => {
  const [loadingSend, setLoadingSend] = useState(false);

  const sendIdea = async ({ ideaDesc, ideaSection, ideaImage }) => {
    try {
      setLoadingSend(true);
      const sendedIdea = await axios.post(
        `${process.env.REACT_APP_ROOT}/api/idea`,
        {
          ideaDesc,
          ideaSection,
          ideaImage,
        }
      );
      setLoadingSend(false);
      toast.success("تم ارسال الفكرة للمسؤول", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ اثناء ارسال الفكرة", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoadingSend(false);
    }
  };
  return (
    <SendIdeaContext.Provider value={{ sendIdea, loadingSend, setLoadingSend }}>
      {children}
    </SendIdeaContext.Provider>
  );
};
export default SendIdeaProvider;
