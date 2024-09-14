import { LinkNav } from './LinkNav'

export const NavBar = () => {
  return (
    <nav className='bg-white dark:bg-gray-900 border-b border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src="logo.webp" className='h-12' alt='Logo Gestión Humana' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Gestión Humana Multired</span>
        </a>

        <div className='w-full md:block md:w-auto' id='navbar-multi-level'>
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <LinkNav link='/' text='Inicio' />
            <LinkNav link='/empleados' text='Empleados' />
            <LinkNav link='/marcacion' text='Marcación' />
            <LinkNav link='/opciones' text='Opciones' />
          </ul>
        </div>
      </div>
    </nav>

  )
}