import { NavBarOpciones } from '../../components/NavBar/NavBarOpciones';
import { Outlet } from 'react-router-dom';

export default function Opciones() {
  return (
    <main className='border h-[91vh]'>
      <nav className='font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'>
        <NavBarOpciones />
      </nav>
      <section className=' '>
        <Outlet />
      </section>
    </main>
  )
}