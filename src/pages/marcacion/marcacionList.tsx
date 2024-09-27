import { BottonExporCartera } from '../../components/ExportExcel';
import { MarcacionResponse } from '../../types/marcacion';
import { URL_API } from '../../utils/contants';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MarcacionesList = () => {
  const [data, setData] = useState<MarcacionResponse>({ marcaciones: [], count: 0 });
  const [fechaInitial, setFechaInitial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');

  useEffect(() => {
    fetchdata();
  }, [fechaInitial, fechaFinal]);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${URL_API}/marcaciones`, { params: { fechaInitial, fechaFinal } });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const cleanDates = () => {
    setFechaInitial('')
    setFechaFinal('')
  }


  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <div className='flex justify-around items-center pb-2'>
        <h1 className="text-gray-700 text-2xl font-semibold">Listado de marcaciones</h1>

        <div className='flex items-center gap-2'>

          <div className='flex items-center gap-2'>
            <label className='w-full'>Fecha Initial</label>
            <input type="date" value={fechaInitial} onChange={(e) => setFechaInitial(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <div className='flex items-center gap-2'>
            <label className='w-full'>Fecha Final</label>
            <input type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <button className='px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-500' onClick={cleanDates}>
            Limpiar Fechas
          </button>
        </div>

        <div className='flex items-center'>
          <span className='font-semibold text-xl'>Cantidad Registros: {data?.count}</span>
        </div>

        <div className='flex items-center gap-2'>
          <BottonExporCartera datos={data.marcaciones} time1={fechaInitial} time2={fechaFinal} />
        </div>

      </div>

      <table className='w-full'>
        <thead className='bg-blue-200'>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Documento</th>
            <th className="px-4 py-2">Nombres</th>
            <th className="px-4 py-2">Apellidos</th>
            <th className="px-4 py-2">Fecha Marcación</th>
            <th className='px-4 py-2'>Hora Marcación</th>
            <th className="px-4 py-2">Estado Marcación</th>
          </tr>
        </thead>
        <tbody>
          {data?.marcaciones?.map((marcacion) => (
            <tr key={marcacion.id}>
              <td className="border px-4 py-2">{marcacion.id}</td>
              <td className="border px-4 py-2">{marcacion.documento}</td>
              <td className="border px-4 py-2">{marcacion.nombres}</td>
              <td className="border px-4 py-2">{marcacion.apellidos}</td>
              <td className="border px-4 py-2">{marcacion.fecha.toString()}</td>
              <td className="border px-4 py-2">{marcacion.hora.toString()}</td>
              <td className="border px-4 py-2">{marcacion.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  );
};

export default MarcacionesList;