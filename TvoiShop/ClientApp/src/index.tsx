import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

createRoot(document.getElementById('root')!).render(<App />);

registerServiceWorker();
