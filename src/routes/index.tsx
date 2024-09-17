import { createBrowserRouter } from 'react-router-dom';

import GrupovsTurno from '../pages/opciones/views/GrupovsTurno';
import Dependencias from '../pages/opciones/views/Dependencias';
import GrupoTurno from '../pages/opciones/views/GrupoTurno';
import Ciudades from '../pages/opciones/views/Ciudades';
import Empresa from '../pages/opciones/views/Empresa';
import Cargos from '../pages/opciones/views/Cargos';
import Turnos from '../pages/opciones/views/Turnos';
import Areas from '../pages/opciones/views/Areas';
import Opciones from '../pages/opciones/Opciones';
import PersonasView from '../pages/persona';
import Marcacion from '../pages/marcacion';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';

import Root from './root';
import InfoPersona from '../pages/persona/InfoPersona';

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
        path: '/empleado/:id',
        element: <InfoPersona />,
      },
      {
        path: '/marcacion',
        element: <Marcacion />,
      },
      {
        path: '/opciones',
        element: <Opciones />,
        children: [
          { index: true, element: <div className='p-2 text-gray-600 flex items-center justify-center h-full pb-20'><span className='text-2xl'> ↩  Seleccione Una Opción</span></div> },
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