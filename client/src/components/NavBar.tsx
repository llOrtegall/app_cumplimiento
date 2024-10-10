import { RiHome2Line, RiGroupLine, RiUserAddLine }from '@remixicon/react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <figure>
        <RiHome2Line size={32} />
      </figure>
      <ul>
        <li className='flex flex-col gap-2'>
          <NavLink title='Todos los clientes' to='/' className={({ isActive }) => isActive ? 'bg-blue-800 text-white rounded-full p-2' : 'bg-gray-200 rounded-full p-2'}>
            <RiGroupLine size={32} />
          </NavLink>
          <NavLink title='Clientes Nuevos' to='clientes-nuevos' className={({ isActive }) => isActive ? 'bg-blue-800 text-white rounded-full p-2' : 'bg-gray-200 rounded-full p-2'}>
            <RiUserAddLine size={32} />
          </NavLink>
        </li>
      </ul>
    </>
  )
}

export default NavBar;