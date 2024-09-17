import { MarcacionResponse } from '../../types/marcacion';
import { URL_API } from '../../utils/contants';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MarcacionesList = () => {
  const [data, setData] = useState<MarcacionResponse | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchdata(page, pageSize);
  }, [page, pageSize]);

  const fetchdata = async (page: number, pageSize: number) => {
    try {
      const response = await axios.get(`${URL_API}/marcaciones`, { params: { page, pageSize } });
      setData(response.data);
      setTotalPages(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <div className='flex justify-around items-center'>
        <h1 className="text-gray-700 text-2xl font-semibold">Listado de marcaciones</h1>

        <div className='flex'>
          <label htmlFor="numbers" className="w-64 flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione Opción</label>
          <select id="numbers" onChange={(e) => setPageSize(Number(e.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Número de datos</option>
            <option value="10">10</option>
            <option value="20" selected>20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
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
          {data?.marcaciones.map((marcacion) => (
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

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default MarcacionesList;