import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft, faChevronLeft, faChevronRight, faHome, faBookOpen,
  faExpand, faPlay, faClock, faFire, faStar, faNewspaper,
  faChartLine, faSun, faMoon
} from '@fortawesome/free-solid-svg-icons';

// Performance monitoring (only in development)
if (import.meta.env.DEV) {
  import('./utils/performanceMonitor.js').then(({ measureWebVitals }) => {
    measureWebVitals();
  });
}

library.add(
  faArrowLeft, faChevronLeft, faChevronRight, faHome, faBookOpen,
  faExpand, faPlay, faClock, faFire, faStar, faNewspaper,
  faChartLine, faSun, faMoon
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
);
