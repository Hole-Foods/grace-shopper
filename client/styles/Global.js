import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

body {
  color: #000000;
  background-color: #FFFFFF;
  font-family: 'Comfortaa';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}

label {
  display: block;
}

nav a {
  display: inline-block;
  margin: 1em;
}

form div {
  margin: 1em;
  display: inline-block;
}

`;

export default GlobalStyles;
