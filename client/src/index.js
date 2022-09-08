import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { EthProvider } from "./contexts";
import './index.css';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EthProvider>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </EthProvider>
  </React.StrictMode>
);
