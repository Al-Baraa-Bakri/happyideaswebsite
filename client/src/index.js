import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Theme } from "./style/theme";
import { BrowserRouter } from "react-router-dom";
import "./style/temp.css";
import AppProvider from "./Context/AppContext";
import ModalProvider from "./Context/ModalContext";
import SendIdeaProvider from "./Context/SendIdeaContext";
import ImageModalProvider from "./Context/ImageModalContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme theme={"light"}>
      <BrowserRouter>
        <AppProvider>
          <ModalProvider>
            <ImageModalProvider>
            <SendIdeaProvider>
              <App />
            </SendIdeaProvider>
            </ImageModalProvider>
          </ModalProvider>
        </AppProvider>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
);
