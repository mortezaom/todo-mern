import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
)