import React from 'react';
import ReactDOM from 'react-dom/client';
import { EthProvider } from "./contexts";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EthProvider>
      <App />
    </EthProvider>
  </React.StrictMode>
);
