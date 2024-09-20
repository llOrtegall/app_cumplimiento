import { MarcacionResponse } from '../../types/marcacion';
import { URL_API } from '../../utils/contants';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MarcacionesList = () => {
  const [data, setData] = useState<MarcacionResponse[]>([]);
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    fetchdata();
  }, [fecha]);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${URL_API}/marcaciones`, { params: { fecha } });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <div className='flex justify-around items-center pb-2'>
        <h1 className="text-gray-700 text-2xl font-semibold">Listado de marcaciones</h1>

        <div className='flex items-center gap-2'>
          <label htmlFor="">Fecha</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>

      </div>

      <table className='w-full'>
        <thead className='bg-blue-200'>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombres</th>
            <th className="px-4 py-2">Apellidos</th>
            <th className="px-4 py-2">Fecha Marcación</th>
            <th className="px-4 py-2">Estado Marcación</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((marcacion) => (
            <tr key={marcacion.id}>
              <td className="border px-4 py-2">{marcacion.id}</td>
              <td className="border px-4 py-2">{marcacion.nombres}</td>
              <td className="border px-4 py-2">{marcacion.apellidos}</td>
              <td className="border px-4 py-2">{marcacion.fecha_marcacion.toString()}</td>
              <td className="border px-4 py-2">{marcacion.estado_marcacion}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  );
};

export default MarcacionesList;