import { createBrowserRouter } from 'react-router-dom';
import PersonasView from '../pages/persona'
import Root from './root';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Not found</div>,
    children: [
      {
        path: '/personas',
        element: <PersonasView />,
      }
    ]
  }
]);