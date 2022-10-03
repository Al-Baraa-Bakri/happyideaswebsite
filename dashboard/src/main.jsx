import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import SectionsProvaider from "./Context/SectionsContext";
import IdeasProvider from "./Context/IdeasContext";
import ImageModalProvider from "./Context/ImageModalContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <SectionsProvaider>
        <IdeasProvider>
          <ImageModalProvider>
            <App />
          </ImageModalProvider>
        </IdeasProvider>
      </SectionsProvaider>
    </ChakraProvider>
  </React.StrictMode>
);
