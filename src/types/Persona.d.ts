export interface Persona {
  id: number
  identificacion: string
  nombres: string
  apellidos: string
}

interface OnePersona {
  id: number;
  tipoIdentificacion: string;
  identificacion: string;
  nombres: string;
  apellidos: string;
  email: string;
  direccion: string;
  ciudad: string;
  tipoPersona: string;
  rH: string;
  telefono: string;
  observaciones: string;
  cod_nomina: string;
  id_Dependencias: number;
  id_Empresa: number;
  estado: string;
  id_Grupo_Horario: number;
  id_Areas: number;
  id_Ciudad: number;
  id_Centro_Costos: number;
  id_Cargo: number;
}
