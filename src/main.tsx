// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter'; // Import AppRouter
import './index.css'; // Global CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter /> {/* Render AppRouter */}
  </React.StrictMode>,
);