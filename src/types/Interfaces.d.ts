export interface Empresa {
  id: number
  nombre: string
  nit: string
  direccion: string
  contacto: string
  email: string
  telefono: string
  ext: string
  ciudad: string
  observacion: string
}

export interface Area {
  id: number
  codigo: string
  descripcion: string
}

export interface Cargo {
  ID: number
  codigo: string
  descripcion: string
}

export interface Turnos {
  id: number;
  codigo: string;
  descripcion: string;
  hora_inicio: string;
  hora_fin: string;
  teorico: string;
  tolerancia_despues_entrada: string;
  tolerancia_antes_salir: string;
  tiempo_breack: string;
  conceptos: string;
}

export interface GrupoTurnos {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface GrupoVsTurno {
  grupoHorario: GrupoTurnos[];
  horario: Turnos[];
}