import { ThemeProvider } from "styled-components";
export const light = {
  colorHeader: "#222222",
  colorSubHeader: "#927777",
  colorBackgroundHero: "#F1F1F1",
  marginSections: "5rem",
  fontsm: "16px",
  fontmd: "1.2em",
  fontlg: "2.5em",
};
// eslint-disable-next-line react/prop-types
export const Theme = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme === "light" ? light : ""}>
      {children}
    </ThemeProvider>
  );
};
