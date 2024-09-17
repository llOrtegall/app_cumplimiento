import { GrupoVsTurno } from '../../../types/Interfaces'
import { URL_API } from '../../../utils/contants'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PlusIcon } from '../../../components/icons/PlusIcon'

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
    <section className='p-1 flex flex-col h-[91vh]'>

      <form className='flex px-4 gap-8'>

        <section className='flex flex-col gap-2 justify-center'>

          <select name='grupoHorario' id='grupoHorario' className='border px-4 py-2 rounded-md'>
            <option value=''>
              Seleccione Grupo
            </option>
            {options?.grupoHorario.map(grupo => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.descripcion}
              </option>
            ))}
          </select>

          <select name='turno' id='turno' className='border px-4 py-2 rounded-md'>
            <option value=''>
              Seleccione Turno
            </option>
            {options?.horario.map(turno => (
              <option key={turno.id} value={turno.id}>
                {turno.descripcion}
              </option>
            ))}
          </select>

        </section>

        <fieldset className='grid grid-cols-4 py-4 gap-2'>
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => (
            <div key={dia} className='flex items-center'>
              <input type='checkbox' name={dia} id={dia} className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500' />
              <label htmlFor={dia} className='ml-2 block text-sm text-gray-700'>{dia}</label>
            </div>
          ))}
        </fieldset>

        <button type='submit' className='my-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-1'>
          <span>Agregar</span>
          <PlusIcon />
        </button>

      </form>

      <table>
        <thead>
          <tr>
            <th className='px-4 py-2'>ID</th>
            <th className='px-4 py-2'>Grupo Turnos</th>
            <th className='px-4 py-2'>Turnos</th>
            <th className='px-4 py-2'>Día</th>
          </tr>
        </thead>
        <tbody>
          {options?.asignados.map(grupo => (
            <tr key={grupo.id}>
              <td className='px-4 py-2'>{grupo.id}</td>
              <td className='px-4 py-2'>{grupo.IdGrupoHorario}</td>
              <td className='px-4 py-2'>{grupo.IdHorario}</td>
              <td className='px-4 py-2'>{grupo.diaSeman}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </section>
  )
}