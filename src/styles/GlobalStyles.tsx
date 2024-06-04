import { Global, css } from "@emotion/react";

import { fonts } from "../fonts/logoFont/fonts.ts";

const globalStyles = css`
  ${fonts}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body,
  html {
    height: 100%;
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
    height: 100%;
  }
`;
function GlobalStyles() {
  return <Global styles={globalStyles} />;
}

export default GlobalStyles;
