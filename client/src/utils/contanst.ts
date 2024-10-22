import { RiDatabase2Line } from '@remixicon/react';

export const CantidadDatos = [
  {
    value: '20',
    label: '20',
    icon: RiDatabase2Line
  },
  {
    value: '50',
    label: '50',
    icon: RiDatabase2Line
  },
  {
    value: '100',
    label: '100',
    icon: RiDatabase2Line
  },
  {
    value: '200',
    label: '200',
    icon: RiDatabase2Line
  },
]

export const Categorizacion = [
  { value: 'CL', label: 'Cliente' },
  { value: 'TR', label: 'Trabajador' },
  { value: 'AC', label: 'Accionista' },
  { value: 'CI', label: 'Colocador Independiente' },
  { value: 'CC', label: 'Cajero Comercial' }
]

export const TipoZona = [
  { value: 'N/A', label: 'N/A' },
  { value: 'URBANO', label: 'URBANO' },
  { value: 'RURAL', label: 'RURAL' }
]

export const URL_API_LOGIN = import.meta.env.VITE_URL_API_LOGIN as string;
export const APP_NAME = import.meta.env.VITE_APP_NAME as string;