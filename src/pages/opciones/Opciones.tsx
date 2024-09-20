import { NavBarOpciones } from '../../components/NavBar/NavBarOpciones';
import { Outlet } from 'react-router-dom';

export default function Opciones() {
  return (
    <main className='flex w-full h-[90vh]'>
      <nav className='w-2/12 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 border-r-2'>
        <NavBarOpciones />
      </nav>
      <section className='w-11/12'>
        <Outlet />
      </section>
    </main>
  )
}