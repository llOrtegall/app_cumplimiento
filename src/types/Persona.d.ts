import { Area, Cargo, GrupoTurnos } from "./Interfaces"

export interface Persona {
  id: number
  identificacion: string
  nombres: string
  apellidos: string
}

interface ResponsePersona {
  persona: Persona
  options: {
    Areas: Area[]
    Cargos: Cargo[]
    GruposHorario: GrupoTurnos[]
  }
}

