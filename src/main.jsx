import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';
import { CartContextProvider } from './context/CartContext.jsx';
import { UserProgressContextProvider } from './context/UserProgressContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProgressContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserProgressContextProvider>
  </React.StrictMode>
);
