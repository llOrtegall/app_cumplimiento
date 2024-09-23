import { Area, Cargo, GrupoTurnos } from "./Interfaces"

export interface Persona {
  id: number
  identificacion: string
  nombres: string
  apellidos: string
}

export interface PersonaFields extends Persona {
  //email: null | string
  // direccion: null | string
  // ciudad: null | string
  // telefono: null | string
  // rH: null | string
  id_Areas: null | number
  id_Cargo: null | number
  id_Grupo_Horario: null | number
}

interface ResponsePersona {
  persona: PersonaFields
  options: {
    Areas: Area[]
    Cargos: Cargo[]
    GruposHorario: GrupoTurnos[]
  }
}

