import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export default createGlobalStyle`
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
    font-family: 'Roboto Mono', monospace;
  }
  
  blockquote {
    border-left: 5px solid ${colors.inputBorder};
    color: ${colors.textSecondary};
    margin: 1.5rem;
    padding: 0 1rem;
    
    a {
      color: ${colors.textSecondary};
    }
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
    color: ${colors.primary};
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
      padding: 0.1rem 0.2rem;
    }
    th {
      padding: 0.1rem;
    }
  }
`;
