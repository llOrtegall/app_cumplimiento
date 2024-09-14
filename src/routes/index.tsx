import { createBrowserRouter } from 'react-router-dom';
import PersonasView from '../pages/persona'
import Root from './root';
import Home from '../pages/Home';
import Opciones from '../pages/opciones/Opciones';
import NotFound from '../pages/NotFound';

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
          }
        ]
      }
    ]
  }
]);