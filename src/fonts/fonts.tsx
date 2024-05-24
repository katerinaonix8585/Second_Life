import { css, Global } from '@emotion/react';

const globalStyles = css`
  @font-face {
    font-family: 'DancingScript';
    src: url('./assets/fonts/logoFont/DancingScript-Regular.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'DancingScript', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;