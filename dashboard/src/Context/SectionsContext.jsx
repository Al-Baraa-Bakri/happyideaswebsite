import { useState, createContext } from "react";
import axios from "axios";

export const SectionsContext = createContext();

const SectionsProvaider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const fetchSections = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_ROOT}/api/section`
    );
    console.log(data.sections);
    setSections(data.sections);
  };
  return (
    <SectionsContext.Provider value={{ sections, fetchSections }}>
      {children}
    </SectionsContext.Provider>
  );
};
export default SectionsProvaider;
