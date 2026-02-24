import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initRevenueCat } from './services/revenuecat';

// Initialize RevenueCat for native platforms
initRevenueCat().catch(console.error);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
