import { createBrowserRouter } from 'react-router-dom';
import Opciones from '../pages/opciones/Opciones';
import PersonasView from '../pages/persona'
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Root from './root';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/empleados',
        element: <PersonasView />,
      },
      {
        path: '/opciones',
        element: <Opciones />,
        children: [
          {
            path: 'empresas',
            element: <div>Empresas</div>
          },
          {
            path: 'ciudades',
            element: <div>Ciudades</div>
          },
          {
            path: 'dependencias',
            element: <div>Dependencias</div>
          },
          {
            path: 'areas',
            element: <div>Areas</div>
          },
          {
            path: 'cargos',
            element: <div>Cargos</div>
          },
          {
            path: 'grupoturno',
            element: <div>Grupo Turnos</div>
          },
          {
            path: 'turnos',
            element: <div>Turnos</div>
          },
          {
            path: 'grupo-turno',
            element: <div>Grupo Turno</div>
          }
        ]
      }
    ]
  }
]);