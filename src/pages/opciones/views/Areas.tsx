import { PlusIcon } from '../../../components/icons/PlusIcon';
import { type Area } from '../../../types/Interfaces';
import { URL_API } from '../../../utils/contants';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Areas() {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    axios.get(`${URL_API}/areas`)
      .then(response => {
        setAreas(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  return (
    <section className="p-1 flex flex-col h-[91vh]">

      <table className="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              CODIGO
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre área
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            areas.map(emp => (
              <tr key={emp.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
                <td className="px-6 py-4">
                  {emp.codigo}
                </td>
                <td className="px-6 py-4">
                  {emp.descripcion}
                </td>
                <td className='px-6 py-4 flex gap-2'>
                  <button className='bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 rounded-md'>Editar</button>
                  <button className='bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md'>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <section className='mt-auto border rounded-md bg-gray-200 py-2'>
        <form className='flex justify-around items-center'>
          <div className='flex items-center'>
            <label className="block text-gray-700 dark:text-gray-400 w-72 text-center">
              Código:
            </label>
            <input type="text"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
          </div>
          <div className='flex items-center'>
            <label className="block text-gray-700 dark:text-gray-400 w-72 text-center">
              Nombre del área:
            </label>
            <input type="text"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-10">
            <PlusIcon />
          </button>
        </form>
      </section>

    </section>
  );
}