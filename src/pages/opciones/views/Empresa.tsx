import { type Empresa } from '../../../types/Interfaces'
import { URL_API } from '../../../utils/contants'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Empresa() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])

  useEffect(() => {
    axios.get(`${URL_API}/empresas`)
      .then(response => {
        setEmpresas(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <section className='p-1'>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombres
              </th>
              <th scope="col" className="px-6 py-3">
                Nit
              </th>
              <th scope="col" className="px-6 py-3">
                Dirección
              </th>
              <th scope="col" className="px-6 py-3">
                Correo
              </th>
              <th scope="col" className="px-6 py-3">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-3">
                Ciudad
              </th>
              <th scope="col" className="px-6 py-3">
                id
              </th>
            </tr>
          </thead>
          <tbody>
            {
              empresas.map(emp => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {emp.nombre}
                  </th>
                  <td className="px-6 py-4">
                    {emp.nit}
                  </td>
                  <td className="px-6 py-4">
                    {emp.direccion}
                  </td>
                  <td className="px-6 py-4">
                    {emp.email}
                  </td>
                  <td className="px-6 py-4">
                    {emp.telefono}
                  </td>
                  <td className="px-6 py-4">
                    {emp.ciudad}
                  </td>
                  <td className="px-6 py-4">
                    {emp.id}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}