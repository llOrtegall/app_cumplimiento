export interface Marcacion {
  id: number;
  nombres: string;
  apellidos: string;
  fecha_marcacion: Date;
  estado_marcacion: string;
  nombre_dispositivo: string;
  observacion: string;
  observacionPersonal: string;
  id_turno: number;
  Pais: string;
  Ciudad: string;
  Direccion: string;
  Latitud: string;
  Longitud: string;
  id_foto_temota: string;
}

export interface MarcacionResponse {
  marcaciones: Marcacion[];
  page: number;
  pageSize: number;
}