import './index.css';

import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';

import App from './ui/App';

const rootElement = document.getElementsByTagName('main')[0];

rootElement &&
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
