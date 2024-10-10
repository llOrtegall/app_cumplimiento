import { createBrowserRouter } from 'react-router-dom';

import ClientesNuevos from '../pages/ClientesNuevos';
import ClienteTodos from '../pages/ClientesTodos';

import Root from './Root';
import EditarCliente from '../pages/EditarCliente';

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
      },
      {
        path: 'editar-cliente/:id',
        element: <EditarCliente />
      }
    ]
  }
]);