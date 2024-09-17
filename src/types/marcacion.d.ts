export interface Marcacion {
  id: number;
  id_empleado: number;
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