import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from './routes'

import './index.css'
import axios from 'axios'
import { AuthProvider } from './auth/AuthContext'

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={BrowserRouter} />
  </AuthProvider>
)
