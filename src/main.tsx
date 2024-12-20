import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';
import './satoshi.css';
import './style_mine.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='73337471551-1b5pcba83i0tgs2olqiarstgs3tgtr2f.apps.googleusercontent.com'>
    <Router>
      <App />
    </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
