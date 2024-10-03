import { useEffect, useState } from 'react';
import { Cliente, DataResponse } from './types/intefaces';
import NavBar from './components/NavBar';

export default function App() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [totalClients, setTotalClients] = useState(0);
  const [identificacion, setIdentificacion] = useState('');

  const [fechaNacimiento, setFechaNacimiento] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://172.20.1.70:3030/clientes?page=${page}&pageSize=${pageSize}`);
        const data = await response.json() as DataResponse;
        setClients(data.clients);
        setTotalClients(data.count);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [page, pageSize]);

  const totalPages = Math.ceil(totalClients / pageSize);

  const handleSearh = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(identificacion);

    try {
      const result = await fetch(`http://172.20.1.70:3030/cliente/${identificacion}`);
      const data = await result.json() as Cliente[];
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }

  }

  const handleSearhByFN = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(fechaNacimiento);
    try {
      const result = await fetch('http://172.20.1.70:3030/clienteFN', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ FN: fechaNacimiento })
      });

      const data = await result.json() as Cliente[];
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }

  }

  return (
    <div className='flex flex-col'>

      <NavBar />

      <div className='flex justify-around py-2 bg-blue-700 text-white'>

        <form className='flex items-center gap-2' onSubmit={ev => handleSearh(ev)}>
          <label >Documento</label>
          <input type="text" required
            value={identificacion} onChange={(e) => setIdentificacion(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button className='bg-green-600 py-2 px-4 rounded-md hover:bg-green-500'>
            Buscar
          </button>
        </form>

        <form className='flex items-center gap-2' onSubmit={ev => handleSearhByFN(ev)}>
          <label className='w-full'>Fecha Nacimiento</label>
          <input type="date"
            value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button className='bg-green-600 py-2 px-4 rounded-md hover:bg-green-500'>
            Buscar
          </button>
        </form>

        {/* <div className='flex items-center gap-2'>
          <label className='w-full'>Fecha Final</label>
          <input type="date" 
          // value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div> */}

        <button className='px-4 py-2 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-500'
        // onClick={cleanDates}
        >
          Limpiar Fechas
        </button>


        <div className='flex items-center'>
          <span className='font-semibold text-xl'>Cantidad Registros: {clients?.length || identificacion?.length}</span>
        </div>


      </div>

      <div className='h-[79vh] overflow-y-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-black sticky top-0 z-10'>
          <thead className='text-xs text-black uppercase bg-blue-200 '>
            <tr>
              <th className='px-6 py-3'> Documento </th>
              <th className='px-6 py-3'> Nombres </th>
              <th className='px-6 py-3'> F. Nacimiento </th>
              <th className='px-6 py-3'> Dirección </th>
              <th className='px-6 py-3'> Telefono </th>
              <th className='px-6 py-3'> Correo </th>
              <th className='px-6 py-3'> Categoría </th>
              <th className='px-6 py-3'> PEP </th>
            </tr>
          </thead>
          <tbody>
            {
              clients.length > 0 ? (
                clients.map(client => (
                  <tr key={client.DOCUMENTO} className='text-black odd:bg-white odd:dark:bg-gray-200 even:bg-gray-50 even:dark:bg-gray-100'>
                    <th scope='row' className='px-6 py-4'>
                      {client.DOCUMENTO}
                    </th>
                    <td className='px-6 py-4'>
                      {client.NOMBRES}
                    </td>
                    <td className='px-6 py-4'>
                      {client.FECHANACIMIENTO ? new Date(client.FECHANACIMIENTO).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className='px-6 py-4'>
                      {client.DIRECCION}
                    </td>
                    <td className='px-6 py-4'>
                      {client.TELEFONO1}
                    </td>
                    <td className='px-6 py-4'>
                      {client.EMAIL}
                    </td>
                    <td className='px-6 py-4'>
                      {client.CATEGORIA}
                    </td>
                    <td className='px-6 py-4'>
                      {client.PEP}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <td colSpan={5} className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
                    No hay datos
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div className='py-2 bg-yellow-200 flex items-center gap-4 justify-center'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}
          className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
          Anterior
        </button>
        <span className='text-lg font-semibold'>
          Página {page} ↔  {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}
          className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
          Siguiente
        </button>
      </div>

    </div >
  );
}