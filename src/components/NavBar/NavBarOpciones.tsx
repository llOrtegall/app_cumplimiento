import { Link } from "react-router-dom"

const LinkRoutes = [
  { id: 1, name: 'Empresas', path: '/' },
  { id: 2, name: 'Ciudades', path: '/' },
  { id: 3, name: 'Dependencias', path: '/' },
  { id: 4, name: 'Areas', path: '/' },
  { id: 5, name: 'Cargos', path: '/' },
  { id: 6, name: 'Grupo Turnos', path: '/' },
  { id: 7, name: 'Turnos', path: '/' },
  { id: 8, name: 'Grupo Turno - Turno', path: '/' }
]

export const NavBarOpciones = ({ visible }: { visible: boolean }) => {
  return (
    <div className={`z-10 ${visible ? 'visible' : 'hidden'} absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
      <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
        {LinkRoutes.map((link) => (
          <li>
            <Link to={link.path} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}