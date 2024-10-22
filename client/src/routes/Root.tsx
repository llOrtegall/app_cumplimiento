import { lazy, Suspense } from 'react';

import { useAuth } from '../auth/AuthContext';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import NavBar from '../components/NavBar';

const LoginPage = lazy(() => import('../pages/LoginPage'));

function Root() {
  const { user } = useAuth();

  if (user) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    )
  }

  return (
    <section className='flex'>
      <nav className='border-r px-2 py-4 flex flex-col items-center gap-6'>
        <NavBar />
      </nav>
      <main className='w-full'>
        <Outlet />
      </main>
      <Toaster position='top-right' duration={5000} visibleToasts={4} richColors />
    </section>
  )
}

export default Root;