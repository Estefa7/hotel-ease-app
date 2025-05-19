import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';
import { AuthProvider } from './components/auth/AuthProvider'; // 👈 import it

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <App />
</AuthProvider>
);
