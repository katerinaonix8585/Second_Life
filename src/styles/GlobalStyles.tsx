import { Global, css } from "@emotion/react";

const globalStyles = css`
  * {
  box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
 
@font-face {
  font-family: 'LibreFranklin';
  src: url('src/fonts/logoFont/LibreFranklin-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
} 

@font-face {
  font-family: 'LibreFranklin';
  src: url('src/fonts/logoFont/LibreFranklin-Medium.ttf') format('truetype');
  font-weight: 500; 
  font-style: normal;
}

@font-face {
  font-family: 'IndieFlower';
  src: url('src/fonts/logoFont/IndieFlower-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Chivo';
  src: url('src/fonts/logoFont/Chivo-Black.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Chivo';
  src: url('src/fonts/logoFont/Chivo-BlackItalic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'Chivo';
  src: url('src/fonts/logoFont/Chivo-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}

`
function GlobalStyles() {
  return <Global styles={globalStyles} />
}

export default GlobalStyles;