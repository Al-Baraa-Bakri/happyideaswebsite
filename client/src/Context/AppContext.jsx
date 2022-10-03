import { useState, createContext } from 'react';
export const AppContaxt = createContext();

const AppProvider = ({ children }) => {
  const [seasons, setSeasons] = useState([]);
  const [loadingSeasons, setLoadingSeasons] = useState(false);
  return (
    <AppContaxt.Provider value={{ seasons, setSeasons, loadingSeasons, setLoadingSeasons }}>
      {children}
    </AppContaxt.Provider>
  );
};
export default AppProvider;
