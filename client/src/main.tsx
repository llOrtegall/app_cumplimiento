import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from './routes'
import { StrictMode } from 'react'

import './index.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://172.20.1.70:3030'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={BrowserRouter} />
  </StrictMode>,
)
