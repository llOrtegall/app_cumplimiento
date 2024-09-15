import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/NavBar/NavBar'
import { Toaster } from 'sonner'

export default function Root () {
  return(
    <>
      <NavBar />
      <Outlet />
      <Toaster duration={4000} richColors position='top-right' visibleToasts={3} />
    </>
  )
}