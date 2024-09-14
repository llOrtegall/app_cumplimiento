import { DrowDown } from './DrowDown'
import { LinkNav } from './LinkNav'
import { useState } from 'react'

export const NavBar = () => {
  const [dropdownNavbar, setDropdownNavbar] = useState(false)

  const handleClickDropDown = () => {
    setDropdownNavbar(!dropdownNavbar)
  }

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src="logo.webp" className='h-12' alt='Flowbite Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Gestión Humana Multired</span>
        </a>

        <div className='w-full md:block md:w-auto' id='navbar-multi-level'>
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>

            <LinkNav link='/inicio' text='Inicio' />
            <LinkNav link='/empleados' text='Empleados' />
            <LinkNav link='/marcacion' text='Marcación' />

            <li className="relative">
              <button onClick={() => handleClickDropDown()} id='dropdownNavbarLink' data-dropdown-toggle='dropdownNavbar' className='flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent'>Configuración<svg className='w-2.5 h-2.5 ms-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4' />
              </svg>
              </button>
              {
                dropdownNavbar &&
                <DrowDown visible={dropdownNavbar} />
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}