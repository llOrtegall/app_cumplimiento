import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from './routes'
import { StrictMode } from 'react'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={BrowserRouter} />
  </StrictMode>,
)
