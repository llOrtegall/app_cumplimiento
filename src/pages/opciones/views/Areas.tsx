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
    <div className="p-1">
      <table className="w-96 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              CODIGO
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre área
            </th>
          </tr>
        </thead>
        <tbody>
          {
            areas.map(emp => (
              <tr key={emp.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-yellow-200 cursor-pointer hover:dark:bg-slate-600">
                <td className="px-6 py-4">
                  {emp.codigo}
                </td>
                <td className="px-6 py-4">
                  {emp.descripcion}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <section>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar
        </button>
      </section>
    </div>
  );
}