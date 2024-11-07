import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './Root';

const ClienteNuevosPage = lazy(() => import('../pages/ClientesNuevos'));
const ClienteTodosPage = lazy(() => import('../pages/ClientesTodos'));
const EditarClientePage = lazy(() => import('../pages/EditarCliente'));
const ReportesPage = lazy(() => import('../pages/ReportesPage'));
const Dashboard = lazy(() => import('../pages/Dashboard'));


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
        path: 'clientes-nuevos',
        element: <Suspense fallback={<div>Loading...</div>}><ClienteNuevosPage /></Suspense>
      },
      {
        path: 'editar-cliente/:id',
        element: <Suspense fallback={<div>Loading...</div>}><EditarClientePage /></Suspense>
      },
      {
        path: 'dashboard',
        element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>
      },
      {
        path: 'reportes',
        element: <Suspense fallback={<div>Loading...</div>}><ReportesPage /></Suspense>
      }
    ]
  }
]);