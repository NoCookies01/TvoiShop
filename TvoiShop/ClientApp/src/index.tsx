import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

createRoot(document.getElementById('root')!).render(<App />);

registerServiceWorker();
