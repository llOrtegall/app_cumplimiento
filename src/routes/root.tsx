import { NavBar } from '../components/NavBar/NavBar'
import { useAuth } from '../auth/AuthContext'
import LoginPage from '../pages/LoginForm';
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function Root() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster duration={4000} richColors position='top-right' visibleToasts={3} />
    </>
  )
}