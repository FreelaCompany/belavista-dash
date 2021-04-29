import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

  html,
  body,
  #root {
    height: 100%;
    scroll-behavior: smooth;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
  }
  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    color:#E5E5E5;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
  }
  button {
    border: 0;
    cursor: pointer;
    background-color: transparent;
  }
  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
