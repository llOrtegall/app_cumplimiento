import { createBrowserRouter } from 'react-router-dom';
import Opciones from '../pages/opciones/Opciones';
import PersonasView from '../pages/persona'
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Root from './root';
import Empresa from '../pages/opciones/views/Empresa';
import Ciudades from '../pages/opciones/views/Ciudades';
import Dependencias from '../pages/opciones/views/Dependencias';
import Areas from '../pages/opciones/views/Areas';
import Cargos from '../pages/opciones/views/Cargos';
import GrupoTurno from '../pages/opciones/views/GrupoTurno';
import Turnos from '../pages/opciones/views/Turnos';
import GrupovsTurno from '../pages/opciones/views/GrupovsTurno';

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
          { path: 'empresas', element: <Empresa /> },
          { path: 'ciudades', element: <Ciudades /> },
          { path: 'dependencias', element: <Dependencias /> },
          { path: 'areas', element: <Areas /> },
          { path: 'cargos', element: <Cargos /> },
          { path: 'grupoturno', element: <GrupoTurno /> },
          { path: 'turnos', element: <Turnos /> },
          { path: 'grupo-turno', element: <GrupovsTurno /> }
        ]
      }
    ]
  }
]);