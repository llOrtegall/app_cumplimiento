import { NavBar } from '../components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAuth } from '../auth/AuthContext'
import LoginPage from '../pages/LoginForm'

export default function Root () {

  const {isAuthenticated, user } = useAuth();

  console.log(isAuthenticated, user);

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return(
    <>
      <NavBar />
      <Outlet />
      <Toaster duration={4000} richColors position='top-right' visibleToasts={3} />
    </>
  )
}