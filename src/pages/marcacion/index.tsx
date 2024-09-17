import { type Marcacion } from '../../types/marcacion'
import { URL_API } from '../../utils/contants'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Marcacion() {
  const [marcaciones, setMarcaciones] = useState<Marcacion[]>([])

  useEffect(() => {
    axios.get(`${URL_API}/marcaciones`)
      .then(response => setMarcaciones(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <section>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id Empleado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Marcación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado Marcación
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {marcaciones.map((marcacion) => (
            <tr key={marcacion.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                {marcacion.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {marcacion.id_empleado}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {marcacion.fecha_marcacion.toString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {marcacion.estado_marcacion}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}