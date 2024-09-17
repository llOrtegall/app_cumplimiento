import { MarcacionResponse } from '../../types/marcacion';
import { URL_API } from '../../utils/contants';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MarcacionesList = () => {
  const [data, setData] = useState<MarcacionResponse | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
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
      <table className='w-full'>
        <thead className='bg-blue-200'>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombres</th>
            <th className="px-4 py-2">Fecha Marcación</th>
            <th className="px-4 py-2">Estado Marcación</th>
          </tr>
        </thead>
        <tbody>
          {data?.marcaciones.map((marcacion) => (
            <tr key={marcacion.id}>
              <td className="border px-4 py-2">{marcacion.id}</td>
              <td className="border px-4 py-2">{marcacion.nombres}</td>
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