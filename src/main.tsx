import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { LangProvider } from './context/LangContext.tsx'

const app = (
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  </StrictMode>
)

const rootEl = document.getElementById('root')!

// Prerendered pages (scripts/prerender.mjs) ship real markup in #root;
// hydrate it instead of replacing it. Plain `vite dev`/unprerendered shells
// have an empty #root, so they fall back to a normal client render.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
