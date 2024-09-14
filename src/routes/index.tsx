import { createBrowserRouter } from 'react-router-dom';
import PersonasView from '../pages/persona'
import Root from './root';
import Home from '../pages/Home';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Not found</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/empleados',
        element: <PersonasView />,
      }
    ]
  }
]);