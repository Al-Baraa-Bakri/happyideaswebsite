import { useState, createContext } from "react";
import axios from "axios";

export const ideasContext = createContext();

const IdeasProvider = ({ children }) => {
  const [ideas, setIdeas] = useState([]);
  const [ideasWaiting, setIdeasWaiting] = useState([]);

  const fetchIdeas = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_ROOT}/api/idea`
    );
    setIdeas(data);
  };

  const fetchIdeasWaiting = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_ROOT}/api/admin/unapproved`
    );
    console.log(data.unApprovedIdeas);
    setIdeasWaiting(data.unApprovedIdeas);
  };
  return (
    <ideasContext.Provider
      value={{ ideas, fetchIdeas, ideasWaiting, fetchIdeasWaiting }}
    >
      {children}
    </ideasContext.Provider>
  );
};
export default IdeasProvider;
