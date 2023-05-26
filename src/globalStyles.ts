import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-size: 14px;
        line-height: 20px;
    }
    
    body,
    body * {
      font-family: Helvetica, Arial, Sans-Serif;
    }
`;
