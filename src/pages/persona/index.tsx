import { URL_API } from '../../utils/contants'
import { Persona } from '../../types/Persona'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'

function PersonasView() {
  const [personas, setPersonas] = useState<Persona[]>([])

  useEffect(() => {
    axios.get<Persona[]>(`${URL_API}/personas`)
      .then((response: AxiosResponse<Persona[]>) => {
        setPersonas(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <section className='flex h-[98vh] overflow-y-auto m-2 rounded-md shadow-md sm:rounded-lg relative'>
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 sticky top-0'>
        <tr>
          <th className='px-2 py-3 text-center'>
            Id
          </th>
          <th className='px-2 py-3'>
            N° Identicación
          </th>
          <th className='px-2 py-3'>
            Apellidos
          </th>
          <th className='px-2 py-3'>
            Nombres
          </th>
          <th className='px-2 py-3'>
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        {
          personas.map((p) => (
            <tr key={p.identificacion} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
              <td className='px-1 py-2 text-center'>
                {p.id}
              </td>
              <td className='px-3 py-2 font-medium text-gray-900 dark:text-white'>
                {p.identificacion}
              </td>
              <td className='px-3 py-2'>
                {p.apellidos}
              </td>
              <td className='px-3 py-2'>
                {p.nombres}
              </td>
              <td className='px-3 py-2'>
                <button className='p-2 bg-blue-500 text-white rounded-md'>
                  Editar
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </section>
  )
}

export default PersonasView
