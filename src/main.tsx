
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove container restrictions to allow for full-width designs
createRoot(document.getElementById("root")!).render(<App />);
