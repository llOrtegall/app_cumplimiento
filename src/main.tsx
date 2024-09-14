import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Router } from './routes'
import axios from 'axios'
import './index.css'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(<RouterProvider router={Router} />)
