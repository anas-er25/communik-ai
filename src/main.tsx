
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add passive event listeners for scroll performance
document.addEventListener('DOMContentLoaded', () => {
  const options = { passive: true };
  document.addEventListener('touchstart', () => {}, options);
  document.addEventListener('touchmove', () => {}, options);
  document.addEventListener('wheel', () => {}, options);
  document.addEventListener('mousewheel', () => {}, options);
});

// Create root with no strict mode to reduce double-rendering in development
createRoot(document.getElementById("root")!).render(<App />);
