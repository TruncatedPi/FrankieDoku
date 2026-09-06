import '@fontsource/comfortaa/latin-400.css';
import '@fontsource/comfortaa/latin-600.css';
import '@fontsource/comfortaa/latin-700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for 100% offline gameplay
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
