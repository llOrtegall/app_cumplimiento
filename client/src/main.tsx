import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from './routes'
import { StrictMode } from 'react'

import './index.css'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_UTL as string

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={BrowserRouter} />
  </StrictMode>,
)
