import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { EthProvider } from "./contexts";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EthProvider>
  </React.StrictMode>
);
