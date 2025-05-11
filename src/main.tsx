import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);