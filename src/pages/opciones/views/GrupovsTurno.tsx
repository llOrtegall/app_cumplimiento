import axios from "axios"
import { useEffect, useState } from "react"
import { URL_API } from "../../../utils/contants"
import { GrupoVsTurno } from "../../../types/Interfaces"

export default function GrupovsTurno() {
  const [options, setOptions] = useState<GrupoVsTurno | null>(null)

  useEffect(() => {
    axios.get(`${URL_API}/grupovsturnos`)
      .then(response => {
        setOptions(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <section className="p-4 bg-blue-200 rounded-md shadow-md">
      <form className="flex px-4 gap-8">

        <section className="w-3/6">
          <div>
            <label htmlFor="grupoHorario" className="block text-sm font-medium text-gray-700">
              Seleccione un grupo
            </label>
            <select name="grupoHorario" id="grupoHorario"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">
                Seleccione un grupo
              </option>
              {options?.grupoHorario.map(grupo => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="turno" className="block text-sm font-medium text-gray-700">
              Seleccione un turno
            </label>
            <select name="turno" id="turno"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" >
              <option value="">
                Seleccione un turno
              </option>
              {options?.horario.map(turno => (
                <option key={turno.id} value={turno.id}>
                  {turno.descripcion}
                </option>
              ))}
            </select>
          </div>
        </section>

        <fieldset className="w-3/6 grid grid-cols-4">
          <legend className="text-sm text-center font-medium text-gray-700">Seleccione los días</legend>
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => (
            <div key={dia} className="flex items-center">
              <input type="checkbox" name={dia} id={dia} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor={dia} className="ml-2 block text-sm text-gray-700">{dia}</label>
            </div>
          ))}
        </fieldset>

      </form>
    </section>
  )
}