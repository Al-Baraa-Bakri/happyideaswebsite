import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800&family=Joan&family=Noto+Kufi+Arabic:wght@100;200;300;400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;700&family=Poppins:wght@200;300;400;500;600;700;800&family=Work+Sans:wght@300;400&display=swap');
    html {
        direction: rtl;
    }
    body {
      background-color: #F1F1F1;
      
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;

    }
    *,*::before,*::after{
    margin: 0;
    padding: 0;
    font-family: "Noto Kufi Arabic", "Open Sans";

}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #D5D6DB; 
  border-radius: 10px;
}





h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}

a{
    color: inherit;
    text-decoration: none;
}
button {
    border: none;
    background-color: transparent;
    cursor: pointer;
}
img {
    max-width: 100%;
}

`;
