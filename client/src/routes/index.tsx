import { createBrowserRouter } from 'react-router-dom';

import ClientesNuevos from '../pages/ClientesNuevos';
import ClienteTodos from '../pages/ClientesTodos';

import Root from './Root';

export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <ClienteTodos />
      },
      {
        path: 'clientes-nuevos',
        element: <ClientesNuevos />
      }
    ]
  }
]);