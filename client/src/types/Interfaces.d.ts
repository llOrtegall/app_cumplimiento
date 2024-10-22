export interface Cliente {
  FECHACARGA: Date;
  TIPODOCUMENTO: string;
  DOCUMENTO: string;
  NOMBRES: string;
  FECHANACIMIENTO: Date;
  CATEGORIA?: string;
  DIRECCION: string;
  TIPOZONA?: string;
  TELEFONO1: string;
  TELEFONO2?: string;
  EMAIL: string;
  PEP: string;
  VERSION: string;
}

export interface DataResponse {
  count: number;
  clients: Cliente[];
  page: number;
  pageSize: number;
}

export interface User {
  id: string;
  names: string,
  lastnames: string,
  username: string,
  email: string,
  company: string,
  process: string,
  sub_process: string,
}