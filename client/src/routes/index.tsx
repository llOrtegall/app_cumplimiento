import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './Root';

const ClienteNuevosPage = lazy(() => import('../pages/ClientesNuevos'));
const ClienteTodosPage = lazy(() => import('../pages/ClientesTodos'));
const EditarClientePage = lazy(() => import('../pages/EditarCliente'));

export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><ClienteTodosPage /></Suspense>
      },
      {
        path: '/clientes-nuevos',
        element: <Suspense fallback={<div>Loading...</div>}><ClienteNuevosPage /></Suspense>
      },
      {
        path: '/editar-cliente/:id',
        element: <Suspense fallback={<div>Loading...</div>}><EditarClientePage /></Suspense>
      }
    ]
  }
]);