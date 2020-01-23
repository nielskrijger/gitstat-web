import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    width: 100%;
    font-size: 14px;
    letter-spacing: -0.006em;
    line-height: 20px;
  }

  body {
    min-height: 100%;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    color: ${colors.text};
    background-color: ${colors.background};
    letter-spacing: .015em;
  }
  
  strong {
    font-weight: bold;
  }
  
  code {
    font-family: 'Inconsolata', monospace;
  }
  
  #root {
    width: 100%;
    min-height: 100%;
  }

  input, button {
    font-size: 1em;
  }
  
  p {
    line-height: 1.75;
  }
  
  li {
    line-height: 1.75;
    
    p:first-child {
      margin-top: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: ${colors.link};
    text-decoration: none;
    
    &:hover {
      color: ${colors.linkHover};
    }
  }
  
  small {
    font-size: 0.85em;
    color: ${colors.textSecondary};
  }
  
  table td {
    border-top: 1px solid ${colors.border};
    padding: 0.4rem;
  }
  table th {
    padding: 0.4rem;
  }
  
  table.plain {
    td {
      border-top: none;
      padding: 0.1rem;
    }
    th {
      padding: 0.1rem;
    }
  }
`;

export default GlobalStyle;
