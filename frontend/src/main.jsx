import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './contexts/GlobalContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <ContextProvider>
    <App />
    </ContextProvider>
  </StrictMode>,
  </BrowserRouter>
)
